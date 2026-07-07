export const meta = () => [
  {title: 'DearBook | Terms of Service'},
  {name: 'description', content: 'Read the terms and conditions governing the use of the DearBook website and services.'},
];

export default function TermsOfService() {
  return (
    <div className="info-page">
      <div className="info-page-hero">
        <h1>Terms of Service</h1>
        <p>Last updated: July 2026</p>
      </div>
      <div className="info-page-content policy-content">
        <section className="info-section">
          <h2>1. Introduction</h2>
          <p>Welcome to DearBook ("we," "our," or "us"). By accessing or using our website at dearbook.ca (the "Site"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Site.</p>
        </section>

        <section className="info-section">
          <h2>2. Use of the Site</h2>
          <p>You may use our Site for lawful purposes only. You agree not to use the Site in any way that violates applicable laws or regulations, or to engage in any activity that could harm the Site or its users.</p>
        </section>

        <section className="info-section">
          <h2>3. Products and Pricing</h2>
          <p>We make every effort to accurately display our products and pricing. However, we reserve the right to correct any errors and to change or update information at any time without prior notice. Prices are listed in Canadian dollars unless otherwise stated.</p>
        </section>

        <section className="info-section">
          <h2>4. Orders and Payment</h2>
          <p>By placing an order, you represent that the information you provide is accurate and complete. We reserve the right to refuse or cancel any order for any reason, including suspected fraud. Payment is processed securely through our payment processors.</p>
        </section>

        <section className="info-section">
          <h2>5. Shipping and Delivery</h2>
          <p>Shipping times and costs are as described in our Shipping Policy. We are not responsible for delays caused by shipping carriers or customs processing for international orders.</p>
        </section>

        <section className="info-section">
          <h2>6. Returns and Refunds</h2>
          <p>Our return and refund policy is described in our Return Policy. By making a purchase, you agree to the terms outlined therein.</p>
        </section>

        <section className="info-section">
          <h2>7. Intellectual Property</h2>
          <p>All content on this Site, including text, graphics, logos, images, and software, is the property of DearBook and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>
        </section>

        <section className="info-section">
          <h2>8. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, DearBook shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Site or purchase of our products.</p>
        </section>

        <section className="info-section">
          <h2>9. Changes to Terms</h2>
          <p>We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated date. Your continued use of the Site constitutes acceptance of the revised terms.</p>
        </section>

        <section className="info-section">
          <h2>10. Contact</h2>
          <p>If you have questions about these Terms of Service, please contact us at <strong>support@dearbook.ca</strong>.</p>
        </section>
      </div>
    </div>
  );
}
