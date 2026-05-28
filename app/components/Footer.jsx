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
              Des cadeaux qui capturent les histoires précieuses de votre famille.
              Parce que les souvenirs méritent d'être préservés pour toujours.
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

          {/* Boutique Links */}
          <div>
            <p className="footer-col-title">Boutique</p>
            <div className="footer-links">
              <a href="/">Accueil</a>
              <a href="/collections/all">Notre Livre</a>
              <a href="/#testimonials">Témoignages</a>
              <a href="/#faq">FAQ</a>
            </div>
          </div>

          {/* Service Client */}
          <div>
            <p className="footer-col-title">Service Client</p>
            <div className="footer-links">
              <a href="/policies/refund-policy">Politique de retour</a>
              <a href="/policies/shipping-policy">Livraison</a>
              <a href="/policies/privacy-policy">Confidentialité</a>
              <a href="/policies/terms-of-service">CGV</a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <p className="footer-col-title">Newsletter</p>
            <p className="footer-newsletter-desc">
              Recevez nos offres exclusives et nos conseils pour créer de beaux
              souvenirs en famille.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} DearBook · dearbook.ca · Tous droits réservés.
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
        ✓ Merci! Vous êtes maintenant inscrit(e).
      </p>
    );
  }

  return (
    <form className="footer-newsletter-form" onSubmit={handleSubmit}>
      <input
        type="email"
        className="footer-newsletter-input"
        placeholder="Votre adresse email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="footer-newsletter-btn">
        S'inscrire
      </button>
    </form>
  );
}
