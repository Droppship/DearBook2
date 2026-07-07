export const meta = () => [
  {title: 'DearBook | Privacy Policy'},
  {name: 'description', content: 'Learn how DearBook collects, uses, and protects your personal information.'},
];

export default function PrivacyPolicy() {
  return (
    <div className="info-page">
      <div className="info-page-hero">
        <h1>Privacy Policy</h1>
        <p>Last updated: July 2026</p>
      </div>
      <div className="info-page-content policy-content">
        <section className="info-section">
          <h2>1. Introduction</h2>
          <p>At DearBook ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website at dearbook.ca or make a purchase.</p>
        </section>

        <section className="info-section">
          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li><strong>Personal Information:</strong> Name, email address, shipping address, phone number, and payment information when you place an order.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and referring URLs.</li>
            <li><strong>Device Information:</strong> Browser type, operating system, IP address, and device identifiers.</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>To process and fulfill your orders</li>
            <li>To send order confirmations and shipping updates</li>
            <li>To respond to customer service requests</li>
            <li>To send promotional communications (with your consent)</li>
            <li>To improve our website and products</li>
            <li>To prevent fraud and enhance security</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>4. Information Sharing</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
          <ul>
            <li><strong>Service Providers:</strong> Payment processors, shipping carriers, and email service providers who help us operate our business.</li>
            <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process.</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>5. Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal information, including SSL encryption for all data transmissions. However, no method of transmission over the Internet is 100% secure.</p>
        </section>

        <section className="info-section">
          <h2>6. Cookies</h2>
          <p>We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. You can control cookie settings through your browser preferences.</p>
        </section>

        <section className="info-section">
          <h2>7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
            <li>Lodge a complaint with a supervisory authority</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>8. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. We encourage you to review this policy periodically.</p>
        </section>

        <section className="info-section">
          <h2>9. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at <strong>support@dearbook.ca</strong>.</p>
        </section>
      </div>
    </div>
  );
}
