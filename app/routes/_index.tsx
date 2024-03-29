import type { MetaFunction } from "@remix-run/node";
import "./basic.css";
import "./index.css";
export const meta: MetaFunction = () => {
  return [
    { title: "Chimani Perks Subscription" },
    { name: "description", content: "Chimani Perks Subscription" },
  ];
};

export default function Index() {
  return (
    <div className="about-perks">
      <section className="hero-wrap container-wrap">
        <div className="hero container-fluid">
          <div className="first-message">
            <h2 className="are-you-prepared-for">
              Welcome to Chimani Pro<br/>
              64 Detailed National Park Guides<br/>
              9 Detailed State Guides<br/>
              GPS-enabled Offline Maps<br/>
              over $2,500 in discounts<br/>
              <br className="are-you-prepared-for__break"/>
            </h2>
            <a className="sign-up-button noselect">
              <span className="sign-up-button__text">SUBSCRIBE NOW</span>
            </a>
          </div>
        </div>
      </section>

      <section className="expert-park-guides-wrap container-wrap">
        <div className="expert-park-guides container-fluid container-fluid--has-image_left">
          <div className="description description--right">
            <h3 className="lead text--green">One App. 70+ Detailed Travel Guides</h3>
            <p>
              Imagine carrying 70 paper travel guide books on your trip! Not with Chimani. Your subscription includes unlimited access to 64 national park travel guides and 9 state-wide outdoor recreation guides. Best of all - as we publish new guides they are automatically included in your subscription!
            </p>
          </div>
          <div className="mock-wrap mock--left">
            <div className="mock__inner_wrap">
              <img src="/images/perks/device-1.png"
                   srcSet="/images/perks/device-1.png 1x, /images/perks/device-1@2x.png 2x"
                   className="mock"/>
            </div>
          </div>
        </div>
      </section>

      <section className="national-park-guides-wrap container-wrap">
        <div className="national-park-guides container-fluid container-wrap--higher">
          <div className="description description--left">
            <h3 className="lead text--white">62 National Park Travel Guides</h3>
            <p className="text--white">
              Guides for the top visited national parks - from <b>Acadia</b> to <b>Zion</b>! Each  guide includes a complete list of all available activities within the park. Auto touring details include all the major (and minor) points of interest throughout the park. Hiking details include difficulty level, distance, elevation gain, photos and a description of trail features.
            </p>
          </div>
          <div className="mock-wrap mock--right">
            <div className="mock__inner_wrap">
              <img src="/images/perks/device-5.png"
                   srcSet="/images/perks/device-5.png 1x, /images/perks/device-5@2x.png 2x"
                   className="mock"/>
            </div>
          </div>
        </div>
      </section>


      <section className="container-wrap">
        <div className="container-fluid container-wrap container-fluid--has-image_left">
          <div className="description description--right ">
            <h3 className="lead text--green">9 State-wide Travel Guides</h3>
            <p>
              Guides for all the most popular states including California, Arizona, Colorado, Illinois, Texas, Georgia, Vermont, New Hampshire, and Maine. More coming soon! Each guides include details on scenic byways, beaches, waterfalls, natural wonders, the top hikes, biking paths, public coastal access, swimming holes, birding hotspots and more!
            </p>
          </div>
          <div className="mock-wrap mock--left">
            <div className="mock__inner_wrap">
              <img src="/images/perks/device-6.png"
                   srcSet="/images/perks/device-6.png 1x, /images/perks/device-6@2x.png 2x"
                   className="mock"/>
            </div>
          </div>
        </div>
      </section>

      <section className="discounts-wrap container-wrap">
        <div className="discounts container-fluid container-wrap--higher">
          <div className="description description--left">
            <h3 className="lead text--white">Written by Local Experts</h3>
            <p className="text--white">
              Written by local travel experts, our travel guides tell you everything you need to know from <b>what to do, where to stay, where to eat and how to get around. </b>
            </p>
          </div>
          <div className="mock-wrap mock--right">
            <div className="mock__inner_wrap">
              <img src="/images/perks/device-3.png"
                   srcSet="/images/perks/device-3.png 1x, /images/perks/device-3@2x.png 2x"
                   className="mock"/>
            </div>
          </div>
        </div>
      </section>


      <section className="container-wrap">
        <div className="container-fluid container-wrap container-fluid--has-image_left">
          <div className="description description--right">
            <h3 className="lead text--green">Offline + GPS-enabled Maps</h3>
            <p>
              <b>No cell phone signal, no problem.</b> Our guides and maps are available offline. This is important because most national parks don't have cell phone coverage. And not only do the maps work, they are GPS-enabled so you can find your exact location at all times.
            </p>
          </div>
          <div className="mock-wrap mock--left">
            <div className="mock__inner_wrap">
              <img src="/images/perks/device-2.png"
                   srcSet="/images/perks/device-2.png 1x, /images/perks/device-2@2x.png 2x"
                   className="mock"/>
            </div>
          </div>
        </div>
      </section>

      <section className="discounts-wrap7 container-wrap">
        <div className="discounts container-fluid container-wrap--higher">
          <div className="description description--left">
            <h3 className="lead text--white">$2,500 in discounts</h3>
            <p className="text--white">
              Save on lodging, dining, and activities with over 200 discount partners throughout the national park system.
              B&Bs in Acadia, whitewater rafting in Grand Teton, and dude ranches in Glacier.
            </p>
          </div>
          <div className="mock-wrap mock--right">
            <div className="mock__inner_wrap">
              <img src="/images/perks/device-11.png"
                   srcSet="/images/perks/device-11.png 1x, /images/perks/device-11@2x.png 2x"
                   className="mock"/>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wrap">
        <div className="container-fluid container-wrap container-fluid--has-image_left">
          <div className="description description--right">
            <h3 className="lead text--green">Collect More Virtual Badges</h3>
            <p>
              Each guide includes hundreds of more points of interest which enable you to "check-in" and collect more virtual badges. It also means you can earn more points!
            </p>
          </div>
          <div className="mock-wrap mock--left">
            <div className="mock__inner_wrap">
              <img
                src="/images/perks/device-10.png"
                   srcSet="/images/perks/device-10.png 1x, /images/perks/device-10@2x.png 2x"
                className="mock"/>
            </div>
          </div>
        </div>
      </section>

      <section className="perks-conclusion-wrap container-wrap" id="payment">
        <div className="perks-conclusion container-fluid">
          <div className="perks-conclusion__logo-wrap">
            <img
              src="/images/perks/chimani-perks-logo.png"
                 srcSet="/images/perks/chimani-perks-logo.png 1x, /images/perks/chimani-perks-logo@2x.png 2x"
                 className="perks-conclusion__logo"/>
          </div>
          <div className="perks-conclusion__description-wrap">
            <h3 className="title">Here are the great benefits you get with your Perks:</h3>
            <ul className="info-points">
              <li className="info">
                <img className="info__icon"
                     src="/images/perks/icon-1.png"
                     srcSet="/images/perks/icon-1.png 1x, /images/perks/icon-1@2x.png 2x"/>
                  <span className="info__text">70+ detailed park guides</span>
              </li>
              <li className="info">
                <img className="info__icon"
                     src="/images/perks/icon-2.png"
                     srcSet="/images/perks/icon-2.png 1x, /images/perks/icon-2@2x.png 2x"/>
                <span className="info__text">Unlimited guides - adding more!</span>
              </li>
              <li className="info">
                <img className="info__icon"
                     src="/images/perks/icon-3.png"
                     srcSet="/images/perks/icon-3.png 1x, /images/perks/icon-3@2x.png 2x"/>
                <span className="info__text">Offline maps and content</span>
              </li>
              <li className="info">
                <img className="info__icon"
                     src="/images/perks/icon-4.png"
                     srcSet="/images/perks/icon-4.png 1x, /images/perks/icon-4@2x.png 2x"/>
                <span className="info__text">$2,500 in discounts</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="footer-division-line-wrap">
        <hr className="footer-division-line"/>
      </div>

    </div>
  );
};
