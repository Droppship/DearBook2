import {NavLink} from '@remix-run/react';
import {useState} from 'react';

export function Footer({menu, shop}) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand */}
          <div>
            <a href="/" className="footer-brand-name">
              📖 DearBook
            </a>
            <p className="footer-brand-desc">
              Gifts that capture your family's precious stories.
              Because memories deserve to be preserved forever.
            </p>
            <div className="footer-social">
              <a
                href="#"
                className="footer-social-link"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="#"
                className="footer-social-link"
                aria-label="Instagram"
              >
                IG
              </a>
              <a
                href="#"
                className="footer-social-link"
                aria-label="TikTok"
              >
                TK
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <p className="footer-col-title">Shop</p>
            <div className="footer-links">
              <a href="/">Home</a>
              <a href="/collections/all">Our Book</a>
              <a href="/#testimonials">Testimonials</a>
              <a href="/#faq">FAQ</a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <p className="footer-col-title">Customer Service</p>
            <div className="footer-links">
              <a href="/policies/refund-policy">Return Policy</a>
              <a href="/policies/shipping-policy">Shipping</a>
              <a href="/policies/privacy-policy">Privacy Policy</a>
              <a href="/policies/terms-of-service">Terms of Service</a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p className="footer-col-title">Newsletter</p>
            <p className="footer-newsletter-desc">
              Receive our exclusive offers and tips for creating beautiful
              family memories.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} DearBook · dearbook.ca · All rights reserved.
          </p>
          <div className="footer-payments">
            {['VISA', 'MC', 'AMEX', 'PayPal', 'Apple Pay'].map((p) => (
              <span key={p} className="footer-payment-icon">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="footer-newsletter-success">
        ✓ Thank you! You are now subscribed.
      </p>
    );
  }

  return (
    <form className="footer-newsletter-form" onSubmit={handleSubmit}>
      <input
        type="email"
        className="footer-newsletter-input"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="footer-newsletter-btn">
        Subscribe
      </button>
    </form>
  );
}
