import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, Check, ChevronRight } from "lucide-react";
import { useEffect } from "react";

import appIcon from "../assets/app-icon.png";
import exploreScreen from "../assets/screen-explore.png";
import overlapScreen from "../assets/screen-hero-overlap.png";
import notifyScreen from "../assets/screen-notify-me.png";
import remindersScreen from "../assets/screen-reminders.png";
import workingHoursScreen from "../assets/screen-working-hours.png";
import findTimeScreen from "../assets/screen-find-time.png";

const APP_STORE_URL = "https://apps.apple.com/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WhenItsTime — Know When to Connect" },
      {
        name: "description",
        content:
          "See local time, working hours, and the best moments to connect with people anywhere.",
      },
      { property: "og:title", content: "WhenItsTime — Know When to Connect" },
      {
        property: "og:description",
        content: "A beautiful little iOS app for finding the right moment across time zones.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function AppStoreButton({ dark = false }: { dark?: boolean }) {
  return (
    <a className={dark ? "store-button store-button-light" : "store-button"} href={APP_STORE_URL}>
      <span className="apple-mark" aria-hidden="true">●</span>
      <span><small>Download on the</small>App Store</span>
    </a>
  );
}

function Index() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="day-story">
      <nav className="site-nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="WhenItsTime home">
          <img src={appIcon} alt="" />
          <span>WhenItsTime</span>
        </a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#pro">Pro</a>
          <Link className="nav-cta" to="/app">Try the app</Link>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="sun-disc" aria-hidden="true" />
        <div className="hero-copy" data-reveal>
          <p className="time-label">Paris · 14:51 <span>New York · 08:51</span></p>
          <h1>Is now a<br />good time?</h1>
          <p className="hero-answer">WhenItsTime helps you find out.</p>
          <p className="hero-detail">See local time, working hours, and the best moments to connect — wherever you are.</p>
          <div className="hero-actions">
            <AppStoreButton />
            <span>Free to start</span>
          </div>
        </div>
        <div className="hero-phone phone-wrap" data-reveal>
          <img src={overlapScreen} alt="WhenItsTime showing the overlap between Paris and New York" />
        </div>
        <a className="scroll-cue" href="#features" aria-label="Continue to features"><ArrowDown size={18} /></a>
      </section>

      <section className="two-places" id="features">
        <div className="section-copy narrow" data-reveal>
          <p className="eyebrow">Two places, one moment</p>
          <h2>Your afternoon might be their evening.</h2>
          <p>Time zones tell you what time it is.<br />WhenItsTime helps you understand what that means.</p>
        </div>
        <div className="time-orbits" data-reveal aria-label="Paris at 3:20 PM and Tokyo at 11:20 PM">
          <div className="orbit orbit-day"><span className="orbit-kicker">Paris</span><strong>15:20</strong><small>afternoon</small></div>
          <div className="orbit-line"><span>+8 hours</span></div>
          <div className="orbit orbit-night"><span className="orbit-kicker">Tokyo</span><strong>23:20</strong><small>night</small></div>
        </div>
      </section>

      <section className="feature feature-overlap">
        <div className="section-copy" data-reveal>
          <p className="eyebrow">Find the moment</p>
          <h2>Find the moment<br />that works.</h2>
          <p>See when your schedules overlap and find a better moment to call, meet, or message.</p>
        </div>
        <div className="phone-stage overlap-stage" data-reveal>
          <div className="horizon-ring" aria-hidden="true" />
          <div className="phone-wrap"><img loading="lazy" src={findTimeScreen} alt="Working-hours overlap in WhenItsTime" /></div>
        </div>
      </section>

      <section className="feature feature-explore">
        <div className="phone-stage explore-stage" data-reveal>
          <div className="phone-wrap"><img loading="lazy" src={exploreScreen} alt="Explore view with New York, Paris, and Chiang Mai" /></div>
        </div>
        <div className="section-copy" data-reveal>
          <p className="eyebrow">Follow the day</p>
          <h2>See how their<br />day is going.</h2>
          <p>Keep the places that matter to you in view and see their local time and working hours at a glance.</p>
        </div>
      </section>

      <section className="feature feature-hours">
        <div className="afternoon-sun" aria-hidden="true" />
        <div className="section-copy" data-reveal>
          <p className="eyebrow">When they’re available</p>
          <h2>Know when they’re<br />actually available.</h2>
          <p>Set working hours for each location and instantly see whether now is a good time — or when the next good window begins.</p>
        </div>
        <div className="phone-stage hours-stage" data-reveal>
          <div className="phone-wrap"><img loading="lazy" src={workingHoursScreen} alt="Working hours settings in WhenItsTime" /></div>
        </div>
      </section>

      <section className="reminder-section">
        <div className="section-copy narrow" data-reveal>
          <p className="eyebrow">Let the app remember</p>
          <h2>You don’t have<br />to remember.</h2>
          <p>Set a reminder for the moment that matters and let WhenItsTime handle the time-zone math.</p>
        </div>
        <div className="reminder-screens" data-reveal>
          <div className="phone-wrap phone-back"><img loading="lazy" src={remindersScreen} alt="Active reminders in WhenItsTime" /></div>
          <div className="phone-wrap phone-front"><img loading="lazy" src={notifyScreen} alt="Reminder options in WhenItsTime" /></div>
        </div>
      </section>

      <section className="human-section">
        <div className="human-inner" data-reveal>
          <img src={appIcon} loading="lazy" alt="WhenItsTime app icon" />
          <h2>Because sometimes,<br />you just want to call someone<br /><em>at the right time.</em></h2>
          <p>Wherever they are.</p>
        </div>
      </section>
    
      <section className="for-section">
        <div className="section-copy narrow" data-reveal>
          <p className="eyebrow">Near, far, wherever</p>
          <h2>For wherever life takes you.</h2>
        </div>
        <div className="for-list">
          {[
            "Working from another country.",
            "Remote teams across time zones.",
            "A life lived between cities.",
            "Your next trip.",
          ].map((text) => (
            <div className="for-row" data-reveal key={text}>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="pro-section" id="pro">
        <div className="pro-intro" data-reveal>
          <p className="eyebrow">WhenItsTime Pro</p>
          <h2>Start free.<br />Go further when<br />you need to.</h2>
          <p>Start with what you need. Go further when you need more.</p>
        </div>
        <div className="pricing" data-reveal>
          <div><span>Monthly</span><strong>$2.99</strong><small>/ month</small></div>
          <div><span>Yearly</span><strong>$19.99</strong><small>/ year</small></div>
          <div><span>Lifetime</span><strong>$39.99</strong><small>once</small></div>
        </div>
        <div className="compare" data-reveal>
          <div>
            <h3>Free</h3>
            <ul>{["2 main locations", "Switch locations", "Working Hours", "Find Time", "Best Overlap", "Explore up to 3 cities", "One-time reminders", "Repeating reminders", "Up to 3 active reminders"].map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
          </div>
          <div>
            <h3>Pro</h3>
            <p>Everything in Free, plus:</p>
            <ul><li><Check size={15} />Unlimited cities in Explore</li><li><Check size={15} />Unlimited active reminders</li></ul>
          </div>
        </div>
      </section>

      <section className="night-section">
        <div className="moon" aria-hidden="true" />
        <div className="night-inner" data-reveal>
          <h2>Know when to connect.<br />Open<br /><em>WhenItsTime.</em></h2>
          <p>The right time, wherever they are.</p>
          <AppStoreButton dark />
        </div>
        <footer>
          <div className="foot-wrap">
            <div className="foot-top">
              <a className="brand" href="#top">
                <img src={appIcon} alt="WhenItsTime app icon" />
                <span>WhenItsTime</span>
              </a>
              <div className="foot-cols">
                <a href="#features">Features</a>
                <a href="#pro">Pricing</a>
                <a href="#privacy">Privacy Policy</a>
                <a href="#contact">Contact Us</a>
              </div>
            </div>
            <div className="foot-bottom">
              <span>© {new Date().getFullYear()} WhenItsTime. All rights reserved.</span>
              <span>Know when to connect.</span>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}