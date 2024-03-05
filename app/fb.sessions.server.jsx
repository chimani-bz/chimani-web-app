// app/sessions.js
import { redirect, createCookieSessionStorage } from "@remix-run/node"; // or "@remix-run/cloudflare"

// Initialize Firebase
// ---------------------
import admin from 'firebase-admin';
import {id} from "@remix-run/dev/dist/vite/vmod.js";
// TODO
// var serviceAccount = require("./service-account.json");
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      "type": "service_account",
      "project_id": "firecms-aa7a0",
      "private_key_id": "e96e36194e5bc9ef5ebbb39dfe1b494319e5240c",
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCzhEaBDkFCx3qZ\nWydUWrVoQbX3yiGIvh9XsdM8xLj0Up6M+S39F7CeXtE5yAHblSI5OufanMwOzpT/\nN+Yv8IhcyS/+4SCGB3Q6Dn+8r649+O8wUFqCaMtjHw33wJX/JFKxqYE0dJfyliTN\n+mwhtGDEzq11ii2vJ7YD7Qiw+zZYoFybuclLxWYAS77GnVFW+hDPXYPn75gH3qL6\nRS0gWEW+IIUjhUrG08G7WbVxE60APTsKCtl2D3DutkJ0lojAaxyjxoMPdRCjPLwB\nq3sGo3ic2Hse8wMA4jbXv1u8E9yV9nXOvSOrPRWhFfPCpR49o0N5xPK9r4iRzynM\nA1cgKr1HAgMBAAECggEAAKlYnyofyHC2vXDuDKwG5hrz4jVe+UOGFwsjNaKd8dyK\nFAfpCPk43+SGjdl0VExQ43gZmZ8hS16sguJAWWXgAsOFB0HqHkRRw9MA2n+lOzo7\nG2j4ZGmhcjyPjx2pD9cg7OGshbZ2RuERwqaNFnS1NJR0ZC39rBsP2yTY9tn+IcZ3\n6awe3ABHgdYloKL7bMoWhuLXmb1NeXVnOS/GJizEgBhWGkLI7RNVW7CwknUWIjuc\navI/Wh35qHULSB4TMjwnLOAOYZfIrtsDK1lgyPU1X6tLBDnL4wR/MvFp0Mtu2Kof\nn8jIeM6KX+pcydpMq+lN6I4bx7q12n5IHzZn3mFKJQKBgQDw6mYAENIz8fqDEZSU\nfnnf9YWMdeC/kCcedEiy3jui1yzrB9i6fV0dz/nBcDYZ5aXXx3kIYQ0AdnRf8NCw\nQZ9Pa98j+lenw2gNhKlH6UreqbdwmEiRPd1wq3XThmfTf3dkzQEllv5dn/vwDOxJ\nxdihA2hjjYmkhsv8ML88Wjb+4wKBgQC+wbj8g2pxAW7z2oylxFiiTYbjN9u8oTAr\nYnpEQBSAEP8NjLATWZ52UAcpYSlFYeJ9s0nynfAggh0PZS78vPfjcwVPjcjYB+e8\namhZ+ubTUlsliYOiMNsz83S4OJavaTYlxnhohJihQpKkm6hfo88Q2wwrt1A0Y+md\ncmzUgfERTQKBgQCSiJ/d7l1MhyQuUKUk5QDQPhAq7Q/0tIN2vJfzY8S2OVby5eTn\nGZVnqrZo+A2QFuSWqJdvh0hXPbVvHZRxgJibwCsLQRvLyMkjX8tvF/EYGfafn6CT\n5yMngsK6FAhW1jMStra53Gt/Gu4shk+6V4J5/Q6jbtWHow2zqRrIZL8KrQKBgGBd\n1WobqaY1Jywh+HO14WD88WvQSD3e4ErKkSHxjWm1LGRX8ouT9q2meDe7UfIvJRCD\nhpP+ndSOZsfkQfyEKmbJMKGj6xbXx4Yz60upqPqQ3GL2OX2yWMrB7vEyBU3QRP6I\naUPD2Kd+zj5CNKk8Q9ssDdX34ZjV8KsNp1Uj3/jxAoGBAOG1u2lKxd7T11NSzpxi\nKABf8BC0AhIWBejjbG+6XasSGbpHBRLlONR7dJ1qhIIXWKB3h/jpDF2+xLXvUbBT\nkTkg5Xw5K3faGMag93v07PmiVfB2klEOoeOIFr36k3snPRsepHQvedDPFNpoa7c1\nrD3lEsjNj6eEcEf/y1dy7A9D\n-----END PRIVATE KEY-----\n",
      "client_email": "firebase-adminsdk-hxv3i@firecms-aa7a0.iam.gserviceaccount.com",
      "client_id": "117061730418627546331",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-hxv3i%40firecms-aa7a0.iam.gserviceaccount.com",
      "universe_domain": "googleapis.com"
    }),
  });
}
/**
 * setup the session cookie to be used for firebase
 */
const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    cookie: {
      name: "fb:token",
      // expires: new Date(Date.now() + 600),
      // TODO
      httpOnly: false,
      // maxAge: 600,
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      // TODO
      secrets: ["f3cr@z7"],
      // TODO
      secure: false,
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
    const decodedClaims = await admin
      .auth()
      .verifySessionCookie(session.get("idToken"), true /** checkRevoked */);
    return { success: true, decodedClaims };
  } catch (error) {
    // Session cookie is unavailable or invalid. Force user to login.
    // return { error: error?.message };
    throw redirect(redirectTo, {
      statusText: error?.message,
    });
  }
};

export const getRemixSession = async (request) => {
  return await getSession(request.headers.get("cookie"));
}
export const getFirebaseIdTokenFromRemixSession = async (request) => {
  const remixSession = await getRemixSession(request)
  console.log('remixSession:')
  console.log(remixSession.get('idToken'))
  const idToken = remixSession.get("idToken")
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
  session.set("idToken", sessionCookie);
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
  console.log('INSIDE sessionLogin')
  console.log('idToken:')
  console.log(idToken)
  const token = await admin.auth().verifyIdToken(idToken);
  console.log('token:')
  console.log(token)
  console.log("idtoken verified", idToken)

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
    .verifySessionCookie(session.get("idToken") , true /** checkRevoked */)
    .then((decodedClaims) => {
      return admin.auth().revokeRefreshTokens(decodedClaims?.sub);
    })
    .then(async () => {
      return redirect("/login", {
        headers: {
          "Set-Cookie": await destroySession(session),
        },
      });
    })
    .catch((error) => {
      return redirect("/login");
      // console.log(error);
      // Session cookie is unavailable or invalid. Force user to login.
      // return { error: error?.message };
    });
};