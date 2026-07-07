export const meta = () => [
  {title: 'DearBook | Shipping Policy'},
  {name: 'description', content: 'Learn about DearBook shipping times, rates, and international delivery options.'},
];

export default function ShippingPolicy() {
  return (
    <div className="info-page">
      <div className="info-page-hero">
        <h1>Shipping Policy</h1>
        <p>Fast, reliable shipping to your door.</p>
      </div>
      <div className="info-page-content policy-content">
        <section className="info-section">
          <h2>Processing Time</h2>
          <p>All orders are processed and shipped within 24 hours of being placed (excluding weekends and holidays). You will receive a confirmation email with your tracking number once your order ships.</p>
        </section>

        <section className="info-section">
          <h2>Shipping Rates & Delivery Times</h2>
          <div className="policy-table-wrap">
            <table className="policy-table">
              <thead>
                <tr><th>Destination</th><th>Method</th><th>Time</th><th>Cost</th></tr>
              </thead>
              <tbody>
                <tr><td>Canada</td><td>Standard</td><td>5–8 business days</td><td>FREE</td></tr>
                <tr><td>Canada</td><td>Express</td><td>2–3 business days</td><td>$9.99</td></tr>
                <tr><td>United States</td><td>Standard</td><td>5–10 business days</td><td>FREE</td></tr>
                <tr><td>United States</td><td>Express</td><td>3–5 business days</td><td>$12.99</td></tr>
                <tr><td>International</td><td>Standard</td><td>10–20 business days</td><td>Calculated at checkout</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="info-section">
          <h2>Order Tracking</h2>
          <p>Once your order ships, you will receive an email with a tracking number. You can use this number to track your package's journey to your door. If you have any questions about your order status, please contact us at support@dearbook.ca.</p>
        </section>

        <section className="info-section">
          <h2>Damaged or Lost Packages</h2>
          <p>If your package arrives damaged or is lost in transit, please contact us within 14 days of the expected delivery date. We will send a replacement at no additional cost to you.</p>
        </section>

        <section className="info-section">
          <h2>Questions?</h2>
          <p>If you have any questions about shipping, please contact our customer service team at <strong>support@dearbook.ca</strong>.</p>
        </section>
      </div>
    </div>
  );
}
