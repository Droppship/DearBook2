import {useState} from 'react';

export const meta = () => [
  {title: 'DearBook | Contact Us'},
  {name: 'description', content: 'Have a question about DearBook? Our customer support team is here to help. Contact us by email or through our contact form.'},
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="info-page">
      <div className="info-page-hero">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you. Our team typically responds within 24 hours.</p>
      </div>

      <div className="info-page-content">
        <div className="contact-layout">
          <div className="contact-info">
            <div className="contact-card">
              <span className="contact-card-icon">📧</span>
              <h3>Email Us</h3>
              <p>support@dearbook.ca</p>
              <p className="contact-card-note">We respond within 24 hours</p>
            </div>
            <div className="contact-card">
              <span className="contact-card-icon">⏰</span>
              <h3>Business Hours</h3>
              <p>Monday – Friday</p>
              <p>9:00 AM – 5:00 PM EST</p>
            </div>
            <div className="contact-card">
              <span className="contact-card-icon">📍</span>
              <h3>Location</h3>
              <p>Montreal, Quebec</p>
              <p>Canada</p>
            </div>
          </div>

          <div className="contact-form-wrap">
            {submitted ? (
              <div className="contact-success">
                <span className="contact-success-icon">✓</span>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <h2>Send Us a Message</h2>
                <div className="contact-form-row">
                  <div className="contact-form-field">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" required placeholder="Your name" />
                  </div>
                  <div className="contact-form-field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required placeholder="your@email.com" />
                  </div>
                </div>
                <div className="contact-form-field">
                  <label htmlFor="subject">Subject</label>
                  <select id="subject" name="subject">
                    <option>Order Status</option>
                    <option>Product Question</option>
                    <option>Returns & Exchanges</option>
                    <option>Bulk Orders</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="contact-form-field">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows={5} required placeholder="How can we help you?" />
                </div>
                <button type="submit" className="btn-primary">Send Message →</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
