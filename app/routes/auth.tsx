import type {LinksFunction} from "@remix-run/node";
import stylesIndex from "./auth.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebookF, faGoogle} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {GoogleAuthProvider, signInWithPopup} from "@firebase/auth";
import {firebaseAuth} from "~/services/auth/firebase-app";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesIndex},
];

export default function Index() {
  const provider = new GoogleAuthProvider();
  const authenticateWithGoogle =  () => {
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user)
      }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode)
      // ...
    });
  }
  return (
    <main className="main-wrap">
      <div className="form-signin-wrapper w-100 m-auto">
        <div className="form-signin">
          <div className="logo__wrap">
            <img className="mb-4 logo-image"
                 src="https://chimani-website.s3.amazonaws.com/images/chimani-logo.png"
                 alt="Chimani logo"/>
          </div>

          <h1 className="h3 mb-3 fw-normal text-center">Sign in / Create an Account</h1>

          {/*<div className="form-floating">*/}
          {/*  <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>*/}
          {/*  <label htmlFor="floatingInput">Email address</label>*/}
          {/*</div>*/}
          {/*<div className="form-floating">*/}
          {/*  <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>*/}
          {/*  <label htmlFor="floatingPassword">Password</label>*/}
          {/*</div>*/}

          {/*<button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>*/}

          <ul className="auth-methods">
            <li className="py-1">
              <button className="btn btn-facebook w-100">
                <FontAwesomeIcon icon={faFacebookF} />
                <span> Sign in with Facebook</span>
              </button>
            </li>
            <li className="py-1">
              <button className="btn btn-google w-100 py-2"
                onClick={authenticateWithGoogle}>
                <FontAwesomeIcon icon={faGoogle} />
                <span> Sign in with Google</span>
              </button>
            </li>
            <li className="py-1">
              <button className="btn btn-primary w-100 py-2">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                <span> Sign in with email</span>
              </button>
            </li>
          </ul>

          <p className="mt-5 mb-3 text-body-secondary text-center">© 2010–{new Date().getFullYear()}</p>
        </div>
      </div>
    </main>
  )
}