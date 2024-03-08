import type {LinksFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import stylesBasic from "./_index/basic.css";
import "./_index/footer.css";
import "./_index/index.css";
import React from "react";
import {getChimaniUser} from "~/services/auth/session.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesBasic},
  { rel: "stylesheet", href: '/type/fontello.css'},
];

// use loader to check for existing session, if found, send the user to the blogs site
export const  loader:LoaderFunction = async ({ request }) => {
  const user = await getChimaniUser(request);
  return {user: user};
}


export const meta: MetaFunction = () => {
  return [
    { title: "Chimani Perks Subscription" },
    { name: "description", content: "Chimani Perks Subscription" },
  ];
};

export default function Index() {

  return (
    <div >
      <div className="about-perks">

      <section className="hero-wrap container-wrap">
        <div className="hero container-fluid">
          <div className="first-message">
            <h2 className="are-you-prepared-for">
              Thank you for your subscription! Next step is to download the Chimani mobile app (<a href="https://itunes.apple.com/us/app/chimani-national-park-guides/id436381327?mt=8">iOS</a> or <a href="https://play.google.com/store/apps/details?id=com.chimani.parks.free">Android</a>) and log-in with your account.
              <br className="are-you-prepared-for__break"/>
            </h2>
          </div>
        </div>
      </section>

      <div className="footer-division-line-wrap">
        <hr className="footer-division-line"/>
      </div>

      <footer className="about-perk-footer">
          <p>©<span id="copyright">2010-2022</span> Chimani, Inc. All rights reserved. |&nbsp;
            <a href="https://www.chimani.com/privacy.html">Privacy Policy</a> | &nbsp;
            <a href="https://www.chimani.com/termsofservice.html">Terms of Service</a> |&nbsp;
            <a href="mailto:info@chimani.com">info (at) chimani.com</a>
          </p>
          <ul className="social gray">
            <li>
              <a href="https://twitter.com/Chimani" title="Chimani on Twitter"><i className="icon-s-twitter"></i></a>
            </li>
            <li>
              <a href="https://www.facebook.com/chimani" title="Chimani on Facebook"><i className="icon-s-facebook"></i></a>
            </li>
            <li>
              <a href="https://instagram.com/chimani/" title="Chimani on Instagram"><i className="icon-s-instagram"></i></a>
            </li>
            <li>
              <a href="#" data-toggle="modal" data-target="#subscribeModal" className="newsletter-link visible-sm" title="Subscribe to our newsletter" target="_blank"><i className="icon-newspaper"></i></a>
            </li>
          </ul>
      </footer>
    </div>
    </div>
  );
};
