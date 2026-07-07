export const meta = () => [
  {title: 'DearBook | Return & Refund Policy'},
  {name: 'description', content: 'DearBook offers a 30-day money-back guarantee. Learn about our hassle-free return and refund process.'},
];

export default function RefundPolicy() {
  return (
    <div className="info-page">
      <div className="info-page-hero">
        <h1>Return & Refund Policy</h1>
        <p>Your satisfaction is our priority — 30-day money-back guarantee.</p>
      </div>
      <div className="info-page-content policy-content">
        <section className="info-section">
          <h2>30-Day Money-Back Guarantee</h2>
          <p>We are confident you will love your DearBook journal. However, if for any reason you are not completely satisfied with your purchase, we offer a full 30-day money-back guarantee — no questions asked.</p>
        </section>

        <section className="info-section">
          <h2>How to Return</h2>
          <ol>
            <li>Contact us at <strong>support@dearbook.ca</strong> within 30 days of receiving your order.</li>
            <li>Include your order number and the reason for the return.</li>
            <li>We will provide you with return shipping instructions.</li>
            <li>Once we receive the returned item, we will process your refund within 5-7 business days.</li>
          </ol>
        </section>

        <section className="info-section">
          <h2>Refund Details</h2>
          <ul>
            <li>Refunds are issued to the original payment method.</li>
            <li>Original shipping costs are non-refundable (if applicable).</li>
            <li>Items must be in their original condition.</li>
            <li>Refunds may take 5-10 business days to appear on your statement.</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>Damaged Items</h2>
          <p>If your journal arrives damaged, please contact us immediately with photos of the damage. We will send a replacement at no cost to you — no need to return the damaged item.</p>
        </section>

        <section className="info-section">
          <h2>Exchanges</h2>
          <p>We currently do not offer direct exchanges. If you need a different item, please return the original and place a new order.</p>
        </section>

        <section className="info-section">
          <h2>Questions?</h2>
          <p>If you have any questions about returns or refunds, please contact us at <strong>support@dearbook.ca</strong>. We're here to help.</p>
        </section>
      </div>
    </div>
  );
}
