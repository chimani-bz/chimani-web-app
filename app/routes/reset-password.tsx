import type {LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import stylesIndex from "./auth.css";
import {sendPasswordResetEmail} from "@firebase/auth";
import {firebaseAuth} from "~/services/auth/firebase-app.client";
import {useState} from "react";
import {Link} from "@remix-run/react";


export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesIndex},
];

// use loader to check for existing session, if found, send the user to the blogs site
export const  loader:LoaderFunction = async ({ request }) => {
  return {};
}

export const meta: MetaFunction = () => {
  return [
    { title: "Chimani | Reset password" },
    { name: "description", content: "Chimani Reset Password Page" },
  ];
};

export default function Index() {
  const [validationMessage, setValidationMessage] = useState('')
  const [wasEmailSent, setWasEmailSent] = useState(false)
  const [email, setEmail] = useState('');

  const requestEmailReset = async () => {
    if(!email) {
      setValidationMessage('Enter valid email address.');
      return
    }
    sendPasswordResetEmail(firebaseAuth, email)
      .then(() => {
        setWasEmailSent(true)
      })
      .catch((error) => {
        if(error.code === 'auth/invalid-email'){
          setValidationMessage('Please enter valid email address.')
        } else {
          setValidationMessage(error.message)
        }
      });
  };

  return (
    <main className="main-wrap">
      <div className="form-signin-wrapper w-100 m-auto">
        <div className="form-signin">
          <div className="logo__wrap">
            <img className="mb-4 logo-image"
                 src="https://chimani-website.s3.amazonaws.com/images/chimani-logo.png"
                 alt="Chimani logo"/>
          </div>

          <h1 className="h3 mb-3 fw-normal text-center">Reset Password</h1>

          <hr/>
          {
            !wasEmailSent &&
            <div>
              <div className="form-floating">
                <input type="email" className="form-control" name="floatingInput" placeholder="name@example.com"
                       value={email} onChange={x => setEmail(x.target.value)}/>
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="py-2">
                <button className="btn btn-primary w-100 py-2"
                        type="button"
                        onClick={() => requestEmailReset()}>
                  <span>Request password reset email</span>
                </button>
              </div>
              <div className="errors">
                {validationMessage}
              </div>
              <div className="py-1">
                <Link to="/auth" className="btn btn-link w-100">
                  <span>Go to login page</span>
                </Link>
              </div>
            </div>
          }

          {wasEmailSent &&
            <div>
              <p>Password reset email will be sent to <b>{email}</b> if an account with that email exists.</p>
              <div className="py-1">
                <Link to="/auth" className="btn btn-link w-100">
                  <span>Continue to login page</span>
                </Link>
              </div>
            </div>
          }


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
      </div>
    </main>
  )
}