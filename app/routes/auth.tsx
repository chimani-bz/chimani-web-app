import type {LinksFunction} from "@remix-run/node";
import stylesIndex from "./auth.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookF, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {useActionData} from "react-router";
import {Form, useFetcher} from "@remix-run/react";
import {getIdToken, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut} from "@firebase/auth";
import {firebaseAuth} from "~/services/auth/firebase-app";
import {sessionLogin} from "~/fb.sessions.server";
import {useRef} from "react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesIndex},
];
// use loader to check for existing session, if found, send the user to the blogs site
export async function loader({ request }) {
  return {};
}

// our action function will be launched when the submit button is clicked
// this will sign in our firebase user and create our session and cookie using user.getIDToken()
export const action = async ({ request }) => {
  console.log('action called')
  const formData = await request.formData();

  try {
    // TODO Validation error appears:
    // `First argument to verifyIdToken() must be a Firebase ID token string.`
    return await sessionLogin(request, formData.get("idToken"), "/");
  } catch (error) {
    return { error: { message: error?.message } };
  }
};

export default function Index() {
  const actionData = useActionData();
  const fetcher = useFetcher();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const signInWithGoogle = async () => {
    await signOut(firebaseAuth);
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAuth, provider)
      .then(async (res) => {
        // const idToken = await res.user.getIdToken();
        const idToken = await getIdToken(res.user);
        console.log('getIdToken:')
        console.log(getIdToken)
        fetcher.submit(
          { idToken: idToken, "google-login": true },
          { method: "post" }
        );
      })
      .catch((err) => {
        console.log("signInWithGoogle", err);
      });
  };
  // const provider = new GoogleAuthProvider();
  // const authenticateWithGoogle =  () => {
  //   signInWithPopup(firebaseAuth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       // IdP data available using getAdditionalUserInfo(result)
  //       // ...
  //       console.log(user)
  //     }).catch((error) => {
  //     // Handle Errors here.
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // The email of the user's account used.
  //     const email = error.customData.email;
  //     // The AuthCredential type that was used.
  //     const credential = GoogleAuthProvider.credentialFromError(error);
  //     console.log(errorCode)
  //     // ...
  //   });
  // }

  const signInWithEmail = async () => {
    try {
      await signOut(firebaseAuth);
      const authResp = await signInWithEmailAndPassword(
        firebaseAuth,
        emailRef.current.value,
        passwordRef.current.value
      );

      // if signin was successful then we have a user
      if (authResp.user) {
        const idToken = await firebaseAuth.currentUser.getIdToken();
        fetcher.submit(
          { idToken: idToken, "email-login": true },
          { method: "post" }
        );
      }
    } catch (err) {
      console.log("signInWithEmail", err);
    }
  };

  return (
    <main className="main-wrap">
      <Form method="post" className="form-signin-wrapper w-100 m-auto">
        <div className="form-signin">
          <div className="logo__wrap">
            <img className="mb-4 logo-image"
                 src="https://chimani-website.s3.amazonaws.com/images/chimani-logo.png"
                 alt="Chimani logo"/>
          </div>

          <h1 className="h3 mb-3 fw-normal text-center">Sign in to Continue</h1>

          {/*<button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>*/}
          <ul className="auth-methods">
            <li className="py-1">
              <button className="btn btn-facebook w-100">
                <FontAwesomeIcon icon={faFacebookF}/>
                <span> Sign in with Facebook</span>
              </button>
            </li>
            <li className="py-1">
              <button className="btn btn-google w-100 py-2"
                      onClick={() => signInWithGoogle()}>
                <FontAwesomeIcon icon={faGoogle}/>
                <span> Sign in with Google</span>
              </button>
            </li>
          </ul>
          <hr/>
          <div>
            <div className="form-floating">
              <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" ref={emailRef}/>
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input type="password" className="form-control" id="floatingPassword" placeholder="Password" ref={passwordRef}/>
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="py-1">
              <button className="btn btn-primary w-100 py-2"
              onClick={() => signInWithEmail()}>
                <FontAwesomeIcon icon={faEnvelope} className="mr-2"/>
                <span> Sign in with email</span>
              </button>
            </div>
          </div>

          <div className="errors">
            {actionData?.error ? actionData?.error?.message : null}
          </div>

          <p className="mt-5 mb-3 text-body-secondary text-center">© 2010–{new Date().getFullYear()}</p>
        </div>
      </Form>
    </main>
  )
}