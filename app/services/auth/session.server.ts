import {createCookieSessionStorage, redirect} from "@remix-run/node";
import admin from 'firebase-admin';
import {UserPersona} from "~/services/auth/models/BaseUser";
import * as process from "process";

const FIREBASE_USER_SESSION_TOKEN_NAME = 'firebase_user_session_token'
if(!process.env.FIREBASE_SERVICE_ACCOUNT_KEY){
  throw Error('Missing env var FIREBASE_SERVICE_ACCOUNT_KEY.')
}
const FIREBASE_SERVICE_ACCOUNT_KEY = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
if(!process.env.FIREBASE_CLIENT_CONFIG){
  throw Error('Missing env var FIREBASE_CLIENT_CONFIG.')
}
const FIREBASE_CLIENT_CONFIG = JSON.parse(process.env.FIREBASE_CLIENT_CONFIG)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT_KEY),
  });
}

/**
 * setup the session cookie to be used for firebase
 */
if(!process.env.SESSION_SECRET){
  throw Error('Missing env var SESSION_SECRET.')
}
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "firebase:session_token",
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      // TODO: Get from env var.
      secrets: [process.env.SESSION_SECRET],
      secure: !!process.env.SESSION_USE_TLS && process.env.SESSION_USE_TLS.toLowerCase() === 'true',
    },
  });

/**
 * checks that the current session is a valid session be getting the token
 * from the session cookie and validating it with firebase
 *
 * @param {*} param0
 * @returns
 */
export const isSessionValid = async (request, redirectTo) => {
  const session = await getSession(request.headers.get("cookie"));
  try {
    // Verify the session cookie. In this case an additional check is added to detect
    // if the user's Firebase session was revoked, user deleted/disabled, etc.
    const idToken = await getFirebaseIdTokenFromRemixSession(request)
    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(idToken, true /** checkRevoked */);
    return {
      success: true,
      persona: UserPersona.Authenticated,
      decodedClaims
    };
  } catch (error) {
    // Session cookie is unavailable or invalid. Force user to login.
    // return { error: error?.message };
    throw redirect(redirectTo, {
      statusText: error?.message,
    });
  }
};

export const getChimaniUser = async (request) => {
  const session = await getSession(request.headers.get("cookie"));
  if (!session){
    return {
      persona: UserPersona.Anonymous
    }
  }
  try {
    const token = session.get(FIREBASE_USER_SESSION_TOKEN_NAME);
    if(token === null){
      return {
        persona: UserPersona.Anonymous
      }
    }
    const decodedClaims = await admin
       .auth()
       .verifySessionCookie(token, true /** checkRevoked */);
    return {
      persona: UserPersona.Authenticated,
      firebaseUid: decodedClaims.uid,
      hasActiveSubscription: false
    }
  } catch (error) {
    return {
      persona: UserPersona.Anonymous
    }
  }
};

export const getRemixSession = async (request) => {
  const cookie = request.headers.get("cookie")
  if (cookie === null){
    return null
  }
  return await getSession(cookie);
}
export const getFirebaseIdTokenFromRemixSession = async (request) => {
  const remixSession = await getRemixSession(request)
  if (remixSession === null) {
    return null
  }

  const idToken = remixSession.get(FIREBASE_USER_SESSION_TOKEN_NAME)
  if(idToken === null || idToken === undefined){
    return null
  }
  return idToken
}


/**
 * set the cookie on the header and redirect to the specified route
 *
 * @param {*} sessionCookie
 * @param {*} redirectTo
 * @returns
 */
const setCookieAndRedirect = async (
  request,
  sessionCookie,
  redirectTo = "/"
) => {
  const session = await getSession(request.headers.get("cookie"));
  session.set(FIREBASE_USER_SESSION_TOKEN_NAME, sessionCookie);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
};

/**
 * login the session by verifying the token, if all is good create/set cookie
 * and redirect to the appropriate route
 *
 * @param {*} idToken
 * @param {*} redirectTo
 * @returns
 */
export const sessionLogin = async (request, idToken, redirectTo) => {
  await admin.auth().verifyIdToken(idToken);
  return admin
    .auth()
    .createSessionCookie(idToken, {
      expiresIn: 60 * 60 * 24 * 5 * 1000,
    })
    .then(
      (sessionCookie) => {
        // Set cookie policy for session cookie.
        return setCookieAndRedirect(request, sessionCookie, redirectTo);
      },
      (error) => {
        return {
          error: `sessionLogin error!: ${error.message}`,
        };
      }
    );
};

/**
 * revokes the session cookie from the firebase admin instance
 * @param {*} request
 * @returns
 */
export const sessionLogout = async (request) => {
  const session = await getSession(request.headers.get("cookie"));

  // Verify the session cookie. In this case an additional check is added to detect
  // if the user's Firebase session was revoked, user deleted/disabled, etc.
  return admin
    .auth()
    .verifySessionCookie(session.get(FIREBASE_USER_SESSION_TOKEN_NAME) , true /** checkRevoked */)
    .then((decodedClaims) => {
      return admin.auth().revokeRefreshTokens(decodedClaims?.sub);
    })
    .then(async () => {
      return redirect("/auth", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    })
    .catch((error) => {
      return redirect("/auth");
      // console.log(error);
      // Session cookie is unavailable or invalid. Force user to login.
      // return { error: error?.message };
    });
};