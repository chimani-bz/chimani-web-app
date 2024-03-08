import type {ActionFunction, LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import stylesIndex from "./auth.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {useActionData} from "react-router";
import {Form, Link, useFetcher, useSearchParams} from "@remix-run/react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "@firebase/auth";
import {firebaseAuth} from "~/services/auth/firebase-app.client";
import {useRef, useState} from "react";
import {sessionLogin} from "~/services/auth/session.server";

type ActionDto = {
  idToken: string
  provider: string
}
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesIndex},
];

// use loader to check for existing session, if found, send the user to the blogs site
export const  loader:LoaderFunction = async ({ request }) => {
  return {};
}

// our action function will be launched when the submit button is clicked
// this will sign in our firebase user and create our session and cookie using user.getIDToken()
export const action:ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  try {
    // TODO Validation error appears:
    // `First argument to verifyIdToken() must be a Firebase ID token string.`
    return await sessionLogin(request, formData.get("idToken"), "/");
  } catch (error) {
    console.log('INSIDE action error')
    return { error: { message: error?.message } };
  }
};

export const meta: MetaFunction = () => {
  return [
    { title: "Chimani Login" },
    { name: "description", content: "Chimani Login Page" },
  ];
};

enum FormMode {
  Login = 'login',
  Register = 'register'
}

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const actionData = useActionData();
  const fetcher = useFetcher<ActionDto>();
  const [validationMessage, setValidationMessage] = useState('')
  const [formMode, setFormMode] = useState(FormMode.Login)

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const signInWithGoogle = async () => {
    await signOut(firebaseAuth);
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAuth, provider)
      .then(async (res) => {
        const idToken = await res.user.getIdToken();
        fetcher.submit(
          {
            idToken: idToken,
            provider: res.user.providerId
          },
          { method: "post" }
        );
      })
      .catch((err) => {
        console.log("signInWithGoogle", err);
      });
  };

  const signInWithEmail = async () => {
    if(emailRef.current === null || passwordRef.current === null){
      return;
    }

    try {
      await signOut(firebaseAuth);
      const authResp = await signInWithEmailAndPassword(
        firebaseAuth,
        emailRef.current.value,
        passwordRef.current.value
      );

      if (authResp.user) {
        const idToken = await authResp.user.getIdToken();
        fetcher.submit(
          {
            idToken: idToken,
            provider: authResp.user.providerId
          },
          { method: "post" }
        );
      }
    } catch (err) {
      console.log("signInWithEmail ERROR:", err);
      if(!err.code) {
        if(err.code === 'auth/invalid-credential') {
          setValidationMessage("Invalid credentials. Please check your email and password are correct.")
        } else if(err.code === 'auth/too-many-requests') {
          setValidationMessage("Your login was disabled because you had too many unsuccessful attempts to log in. To continue please reset your password or try again a bit later.")
        }
      }
    }
  };
  const registerWithEmail = async () => {
    if(emailRef.current === null || passwordRef.current === null){
      return;
    }

    try {
      await signOut(firebaseAuth);
      const authResp = await createUserWithEmailAndPassword(
        firebaseAuth,
        emailRef.current.value,
        passwordRef.current.value
      );

      if (authResp.user) {
        const idToken = await authResp.user.getIdToken();
        fetcher.submit(
          {
            idToken: idToken,
            provider: authResp.user.providerId
          },
          { method: "post" }
        );
      }
    } catch (err) {
      console.log("registerWithEmail ERROR:", err);
      if(!err.code) {
        if(err.code === 'auth/invalid-credential') {
          setValidationMessage("Invalid credentials. Please check your email and password are correct.")
        } else if(err.code === 'auth/too-many-requests') {
          setValidationMessage("Your login was disabled because you had too many unsuccessful attempts to log in. To continue please reset your password or try again a bit later.")
        }
      }
    }
  };
  const selectedPlanLabel = (()=>{
    const plan = searchParams.get('plan');
    switch (plan){
      case 'annual': return <h3 className="plan-name">Annual plan checkout</h3>
      case 'lifetime': return <h3 className="plan-name">Lifetime plan checkout</h3>
      default: return <></>
    }
  })()
  return (
    <main className="main-wrap">
      <Form method="post" className="form-signin-wrapper w-100 m-auto">
        <div className="form-signin">
          <div className="logo__wrap">
            <img className="mb-4 logo-image"
                 src="https://chimani-website.s3.amazonaws.com/images/chimani-logo.png"
                 alt="Chimani logo"/>
          </div>

          {selectedPlanLabel}
          <h1 className="h3 mb-3 fw-normal text-center">Sign in to Continue</h1>

          <ul className="auth-methods">
            <li className="py-1">
              <button className="btn btn-google w-100 py-2"
                  type="button"
                  onClick={() => signInWithGoogle()}>
                <FontAwesomeIcon icon={faGoogle}/>
                <span> Sign in with Google</span>
              </button>
            </li>
          </ul>
          <hr/>
          { formMode === FormMode.Login &&
            <div>
              <div className="form-floating">
                <input type="email" className="form-control" name="floatingInput" placeholder="name@example.com"
                       ref={emailRef}/>
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                       ref={passwordRef}/>
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="py-1">
                <button className="btn btn-primary w-100 py-2"
                        type="button"
                        onClick={() => signInWithEmail()}>
                  <FontAwesomeIcon icon={faEnvelope}/>
                  <span>Sign in with email</span>
                </button>
              </div>
              <div className="py-1">
                <button className="btn btn-link w-100"
                        type="button"
                        onClick={() => setFormMode(FormMode.Register)}>
                  <span>Register in with email</span>
                </button>
                <Link to="/reset-password" className="btn btn-link w-100">
                  <span>Forgot password?</span>
                </Link>
              </div>
            </div>
          }
          {formMode === FormMode.Register &&
            <div>
              <div className="form-floating">
                <input type="email" className="form-control" name="floatingInput" placeholder="name@example.com"
                       ref={emailRef}/>
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                       ref={passwordRef}/>
                <label htmlFor="floatingPassword">Set Password</label>
              </div>
              <div className="py-1">
                <button className="btn btn-primary w-100 py-2"
                        type="button"
                        onClick={() => registerWithEmail()}>
                  <span>Register with email</span>
                </button>
              </div>
              <div className="py-1">
                <button className="btn btn-link w-100"
                        type="button"
                        onClick={() => setFormMode(FormMode.Login)}>
                  <span>Sign in with email</span>
                </button>
                <Link to="/reset-password" className="btn btn-link w-100">
                  <span>Forgot password?</span>
                </Link>
              </div>
            </div>
          }


          <div className="errors">
            {actionData?.error ? actionData?.error?.message : null}
            {validationMessage}
          </div>

          <div className="footer">
          <div className="mt-5 text-body-secondary text-center">
              ©2010–{new Date().getFullYear()}<br/>
              Chimani, Inc.
            </div>
            <div className="footer-link">
              <ul className="footer-link__list">
                <li><a href="https://www.chimani.com/privacy.html"> Privacy Policy </a></li>
                <li><a href="https://www.chimani.com/termsofservice.html"> Terms of Service </a></li>
                <li><a href="mailto:info@chimani.com"> info@chimani.com </a></li>
              </ul>
            </div>
          </div>
        </div>
      </Form>
    </main>
  )
}