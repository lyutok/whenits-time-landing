import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, Check, ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import appIcon from "../assets/app-icon.png";
import exploreScreen from "../assets/screen-explore.png";
import overlapScreen from "../assets/screen-hero-overlap.png";
import notifyScreen from "../assets/screen-notify-me.png";
import remindersScreen from "../assets/screen-reminders.png";
import workingHoursScreen from "../assets/screen-working-hours.png";
import findTimeScreen from "../assets/screen-find-time.png";

const APP_STORE_URL = "https://apps.apple.com/us/app/whenitstime/id6793032524";
const OG_IMAGE_URL = "https://whenitstime.pages.dev/og-image.png";

export const Route = createFileRoute("/")({
  head: () => ({
    title: "WhenItsTime — Time Zone Overlap & Best Time to Call (iPhone App)",
    meta: [
      {
        name: "description",
        content:
          "Find the best time to call or meet across time zones. WhenItsTime shows local times, working-hours overlap and sets reminders. Free iPhone app.",
      },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large",
      },
      {
        name: "msvalidate.01",
        content: "99F18009A1D653EAC2EFE44D66D3D020",
      },
      {
        name: "apple-itunes-app",
        content: "app-id=6793032524",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:site_name",
        content: "WhenItsTime",
      },
      {
        property: "og:url",
        content: "https://whenitstime.pages.dev/",
      },
      {
        property: "og:title",
        content: "WhenItsTime — Know When to Connect Across Time Zones",
      },
      {
        property: "og:description",
        content:
          "Find the best time to call or meet across time zones. Compare working hours, see the overlap, set reminders.",
      },
      {
        property: "og:image",
        content: OG_IMAGE_URL,
      },
      {
        property: "og:image:width",
        content: "1451",
      },
      {
        property: "og:image:height",
        content: "1084",
      },
      {
        property: "og:image:alt",
        content: "WhenItsTime — Know when to connect across time zones",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "WhenItsTime — Know When to Connect Across Time Zones",
      },
      {
        name: "twitter:description",
        content: "Find the best time to call or meet across time zones. Free iPhone app.",
      },
      {
        name: "twitter:image",
        content: OG_IMAGE_URL,
      },
    ],
    links: [{ rel: "canonical", href: "https://whenitstime.pages.dev/" }],
    scripts: [
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-T4R1CPRER4",
        async: true,
      },
      {
        children: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-T4R1CPRER4');
        `,
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "WhenItsTime",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "iOS",
          description:
            "WhenItsTime helps you find the right time to connect across time zones: local times, working-hours overlap, best time to call and reminders.",
          url: "https://whenitstime.pages.dev/",
          downloadUrl: "https://apps.apple.com/us/app/whenitstime/id6793032524",
          image: OG_IMAGE_URL,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "How do I find the best time to call someone in another time zone?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Compare the working hours of both places and look for the overlap. WhenItsTime does this for you: set your work hours once, pick two locations and see the windows when both of you are available.",
              },
            },
            {
              "@type": "Question",
              name: "What is working-hours overlap across time zones?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "It is the part of the day when it is working time in both locations at once. For example, 9:00–17:00 in Berlin only overlaps with 9:00–17:00 in New York for a couple of hours.",
              },
            },
            {
              "@type": "Question",
              name: "Is WhenItsTime free?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, you can start for free with 2 main locations, Working Hours, Find Time, Best Overlap and up to 3 cities in Explore. WhenItsTime Pro adds unlimited cities and reminders: $2.99 per month, $19.99 per year or $39.99 once. Local prices may vary.",
              },
            },
            {
              "@type": "Question",
              name: "Can I set a reminder for a time in another time zone?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Set a one-time or repeating reminder for the moment that matters and WhenItsTime handles the time-zone math.",
              },
            },
            {
              "@type": "Question",
              name: "Where can I download WhenItsTime?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "WhenItsTime is an iOS app available on the App Store.",
              },
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function AppStoreButton({ dark = false }: { dark?: boolean }) {
  return (
    <a
      className={dark ? "store-button store-button-light" : "store-button"}
      href={APP_STORE_URL}
      target="_blank"
      rel="noreferrer"
      onClick={() => {
        const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
        gtag?.("event", "app_store_click", {
          button_variant: dark ? "footer" : "hero",
          debug_mode: true,
        });
      }}
    >
      <span className="apple-mark" aria-hidden="true">●</span>
      <span><small>Download on the</small>App Store</span>
    </a>
  );
}

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <a href="#faq">FAQ</a>
          {/* link to web demo */}
          {/* <Link className="nav-cta" to="/app">Try the app</Link> */}
          <a className="nav-cta" href={APP_STORE_URL} target="_blank" rel="noreferrer">Try the app</a>
        </div>

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {mobileMenuOpen && (
          <div className="mobile-menu" aria-label="Mobile navigation">
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>
              Features
            </a>
            <a href="#pro" onClick={() => setMobileMenuOpen(false)}>
              Pro
            </a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
              FAQ
            </a>
            {/* <Link to="/app" onClick={() => setMobileMenuOpen(false)}>Try the app</Link> */}
            <a href={APP_STORE_URL} target="_blank" rel="noreferrer" onClick={() => setMobileMenuOpen(false)}>Try the app</a>
          </div>
        )}
      </nav>

      <section className="hero" id="top">
        <div className="sun-disc" aria-hidden="true" />
        <div className="hero-copy" data-reveal>
          <p className="time-label">Berlin · 15:49 <span>New York · 09:49</span></p>
          <h1>Is now a<br />good time?</h1>
          <p className="hero-answer">WhenItsTime helps you find out.</p>
          <p className="hero-detail">See local time, working hours, and the best moments to connect — wherever you are.</p>
          <div className="hero-actions">
            <AppStoreButton />
            <span>Free to start</span>
          </div>
        </div>
        <div className="hero-phone phone-wrap" data-reveal>
          <img src={overlapScreen} alt="WhenItsTime showing the overlap between Berlin and New York" />
        </div>
        <a className="scroll-cue" href="#pro" aria-label="Continue to price"><ArrowDown size={18} /></a>
      </section>

      <section className="two-places" id="features">
        <div className="section-copy narrow" data-reveal>
          <p className="eyebrow">Two places, one moment</p>
          <h2>Your afternoon might be their evening.</h2>
          <p>Time zones tell you what time it is.<br />WhenItsTime helps you understand what that means.</p>
        </div>
        <div className="time-orbits" data-reveal aria-label="Berlin at 3:20 PM and Tokyo at 11:20 PM">
          <div className="orbit orbit-day"><span className="orbit-kicker">Berlin</span><strong>15:20</strong><small>afternoon</small></div>
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
          <div className="phone-wrap"><img loading="lazy" src={workingHoursScreen} alt="Working hours settings" /></div>
        </div>
        <div className="section-copy" data-reveal>
          <p className="eyebrow">When they’re available</p>
          <h2>Know when your work hours<br />line up.</h2>
          <p>Set your work hours once for your work location and instantly see when they fall in your current location.</p>
        </div>
      </section>

      <section className="feature feature-hours">
        <div className="afternoon-sun" aria-hidden="true" />
        <div className="section-copy" data-reveal>
          <p className="eyebrow">Keep your world in view</p>
          <h2>See local time and <br />working hours at a glance.</h2>
          <p>Keep the places that matter to you close and see where they are in their day.</p>
        </div>
        <div className="phone-stage hours-stage" data-reveal>
          <div className="phone-wrap"><img loading="lazy" src={exploreScreen} alt="Explore view" /></div>
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

      <div className="evening-arc">
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
          <p className="pricing-note">*Local prices may vary by country or region.</p>
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

        <section className="faq-section" id="faq">
          <div className="faq-inner">
            <div className="faq-heading">
              <p className="eyebrow">A few helpful answers</p>
              <h2>
                Time zone questions,
                <br />
                answered.
              </h2>
            </div>
            <div className="faq-list">
              <details>
              <summary>How do I find the best time to call someone in another time zone?</summary>
              <p>
                Compare the working hours of both places and look for the overlap. WhenItsTime does
                this for you: set your work hours once, pick two locations and see the windows when
                both of you are available.
              </p>
              </details>
              <details>
              <summary>What is working-hours overlap across time zones?</summary>
              <p>
                It is the part of the day when it is working time in both locations at once. For
                example, 9:00–17:00 in Berlin only overlaps with 9:00–17:00 in New York for a couple
                of hours.
              </p>
              </details>
              <details>
              <summary>Is WhenItsTime free?</summary>
              <p>
                Yes, you can start for free with 2 main locations, Working Hours, Find Time, Best
                Overlap and up to 3 cities in Explore. WhenItsTime Pro adds unlimited cities and
                reminders: $2.99 per month, $19.99 per year or $39.99 once. Local prices may vary.
              </p>
              </details>
              <details>
              <summary>Can I set a reminder for a time in another time zone?</summary>
              <p>
                Yes. Set a one-time or repeating reminder for the moment that matters and
                WhenItsTime handles the time-zone math.
              </p>
              </details>
              <details>
              <summary>Where can I download WhenItsTime?</summary>
              <p>
                WhenItsTime is an iOS app available on the <a href={APP_STORE_URL}>App Store</a>.
              </p>
              </details>
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
          <footer id="contact">
          <div className="foot-wrap">
            <div className="foot-top">
              <a className="brand" href="#top">
                <img src={appIcon} alt="WhenItsTime app icon" />
                <span>WhenItsTime</span>
              </a>
              <div className="foot-cols">
                <a href="#features">Features</a>
                <a href="#pro">Pricing</a>
                <a href="#faq">FAQ</a>
                <Link to="/privacy">Privacy Policy</Link>
                <a href="mailto:helloapps.studio%40outlook.com?subject=WhenItsTime%20inquiry" target="_blank">
                {/* <a
                  href="https://outlook.live.com/mail/0/deeplink/compose?to=helloapps.studio%40outlook.com&subject=WhenItsTime%20inquiry"
                  target="_blank"
                  rel="noopener noreferrer"
                > */}
                  Contact Us
                </a>
              </div>
            </div>
            <div className="foot-bottom">
              <span>© {new Date().getFullYear()} WhenItsTime. All rights reserved.</span>
              <span>Know when to connect.</span>
            </div>
          </div>
          </footer>
        </section>
      </div>
    </main>
  );
}