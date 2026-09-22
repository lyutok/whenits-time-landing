import { Link, createFileRoute } from "@tanstack/react-router";

import appIcon from "../assets/app-icon.png";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — WhenItsTime" },
      {
        name: "description",
        content: "Privacy Policy for the WhenItsTime time zone and working-hours app.",
      },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <main className="policy-page">
      <header className="policy-header">
        <Link className="policy-brand" to="/">
          <img className="policy-brand-mark" src={appIcon} alt="" />
          <span>WhenItsTime</span>
        </Link>
        <Link className="policy-home-link" to="/">Back to home</Link>
      </header>

      <article className="policy-content">
        <p className="eyebrow">Privacy</p>
        <h1>Privacy Policy for When It&apos;s Time</h1>
        <p className="policy-updated"><strong>Last updated:</strong> September 22, 2026</p>
        <p>When It&apos;s Time (&ldquo;the App&rdquo;) is a time zone and working-hours app.</p>
        <p>This Privacy Policy explains what information When It&apos;s Time uses, how that information is handled, and what choices you have.</p>

        <h2>1. Information We Use</h2>
        <h3>Location Information</h3>
        <p>When It&apos;s Time may request access to your device&apos;s location to determine your current location and local time zone.</p>
        <p>Location information is used to:</p>
        <ul>
          <li>determine your current city and time zone;</li>
          <li>display your local time;</li>
          <li>compare your local time with other locations;</li>
          <li>calculate working-hour overlaps and suitable times to connect.</li>
        </ul>
        <p>When It&apos;s Time does not require you to create an account to use these features.</p>
        <p>Location information used by the App is processed on your device and is not sent to our own servers or stored in a personal account.</p>
        <p>You can disable location access at any time through your device&apos;s Settings. Some location-based features may not work correctly if access is disabled.</p>

        <h2>2. Information Stored on Your Device</h2>
        <p>When It&apos;s Time stores certain app settings and preferences locally on your device. This may include information such as:</p>
        <ul>
          <li>selected cities or locations;</li>
          <li>working-hours preferences;</li>
          <li>reminder settings;</li>
          <li>app preferences.</li>
        </ul>
        <p>This information is used only to provide the App&apos;s functionality.</p>
        <p>We do not maintain a personal user account or a cloud database containing this information.</p>

        <h2>3. Notifications</h2>
        <p>If you enable notifications, When It&apos;s Time may schedule local notifications on your device.</p>
        <p>Notifications are used for features such as:</p>
        <ul>
          <li>working-hours reminders;</li>
          <li>overlap reminders;</li>
          <li>custom reminders.</li>
        </ul>
        <p>These notifications are generated and managed by your device. You can disable notification permissions at any time in your device settings.</p>

        <h2>4. Purchases and Subscriptions</h2>
        <p>When It&apos;s Time offers optional paid features through Apple&apos;s In-App Purchase system, including subscriptions and a lifetime purchase.</p>
        <p>Payments are processed by Apple through the App Store. We do not receive or store your credit card, debit card, or other payment details.</p>
        <p>Apple may provide the App with information necessary to verify the status of your purchase or subscription.</p>
        <p>Purchases are subject to Apple&apos;s applicable terms and policies.</p>

        <h2>5. Third-Party Services</h2>
        <p>When It&apos;s Time uses Apple&apos;s system services and frameworks necessary to provide app functionality, including:</p>
        <ul>
          <li>Core Location;</li>
          <li>Apple StoreKit and App Store services;</li>
          <li>Apple notification services.</li>
        </ul>
        <p>We do not sell your personal information.</p>
        <p>We do not share your personal information with third parties for their own advertising or marketing purposes.</p>

        <h2>6. Analytics and Tracking</h2>
        <p>When It&apos;s Time does not use personal accounts or third-party advertising networks.</p>
        <p>The App does not track you across other companies&apos; apps or websites for advertising purposes.</p>

        <h2>7. Data Retention and Deletion</h2>
        <p>Because the App does not maintain a personal user account or store your app data on our servers, we do not maintain a personal database of your app settings.</p>
        <p>Information stored locally by the App remains on your device until you remove it, change the relevant settings, or delete the App.</p>
        <p>You can delete locally stored app information by deleting the App from your device.</p>
        <p>Purchase and subscription records are handled by Apple and are subject to Apple&apos;s retention and account policies.</p>

        <h2>8. Children&apos;s Privacy</h2>
        <p>When It&apos;s Time is not specifically directed to children under the age of 13.</p>
        <p>We do not knowingly collect personal information from children through the App.</p>

        <h2>9. Your Privacy Choices</h2>
        <p>You can control access to certain device information through your iOS settings, including:</p>
        <ul>
          <li>Location Services;</li>
          <li>Notifications.</li>
        </ul>
        <p>You may also delete the App at any time to remove locally stored app data.</p>

        <h2>10. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy when the App&apos;s functionality or privacy practices change.</p>
        <p>Any updated version will be made available through the privacy-policy page, with the updated date shown at the top.</p>

        <h2>11. Contact</h2>
        <p>If you have questions about this Privacy Policy or When It&apos;s Time&apos;s privacy practices, you can contact:</p>
        <p><strong>Email:</strong> [YOUR PRIVACY EMAIL]</p>
      </article>
    </main>
  );
}
