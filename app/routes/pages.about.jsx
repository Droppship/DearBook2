import {Link} from '@remix-run/react';

export const meta = () => [
  {title: 'DearBook | About Us — Our Story'},
  {name: 'description', content: 'Learn about DearBook and our mission to help families preserve their most precious memories through beautifully crafted guided journals.'},
];

export default function AboutPage() {
  return (
    <div className="info-page">
      <div className="info-page-hero">
        <h1>Our Story</h1>
        <p>Helping families preserve what matters most — one story at a time.</p>
      </div>

      <div className="info-page-content">
        <section className="info-section">
          <h2>Why We Created DearBook</h2>
          <p>
            DearBook was born from a simple realization: the most valuable stories
            in our lives are the ones that are never written down. Every family has
            a treasury of memories — childhood adventures, first loves, hard-won
            wisdom — that exists only in the minds of the people who lived them.
          </p>
          <p>
            When the founder lost his grandfather, he realized that decades of
            stories, lessons, and family history had disappeared forever. That
            moment of loss sparked a mission: to create a beautiful, thoughtful
            tool that makes it easy for families to capture these irreplaceable
            memories while they still can.
          </p>
        </section>

        <section className="info-section">
          <h2>Our Mission</h2>
          <p>
            We believe every father's story deserves to be told. Our mission is to
            bridge generations by giving families a simple, beautiful way to
            preserve the memories that matter most. We don't just sell journals —
            we create moments of connection that last forever.
          </p>
        </section>

        <section className="info-section">
          <div className="info-stats">
            <div className="info-stat">
              <span className="info-stat-number">50,000+</span>
              <span className="info-stat-label">Families Served</span>
            </div>
            <div className="info-stat">
              <span className="info-stat-number">4.9/5</span>
              <span className="info-stat-label">Customer Rating</span>
            </div>
            <div className="info-stat">
              <span className="info-stat-number">12</span>
              <span className="info-stat-label">Countries</span>
            </div>
            <div className="info-stat">
              <span className="info-stat-number">200+</span>
              <span className="info-stat-label">Guided Questions</span>
            </div>
          </div>
        </section>

        <section className="info-section">
          <h2>Our Values</h2>
          <div className="info-values">
            <div className="info-value">
              <span className="info-value-icon">❤️</span>
              <h3>Family First</h3>
              <p>Every decision we make is guided by one question: will this help families connect more deeply?</p>
            </div>
            <div className="info-value">
              <span className="info-value-icon">💎</span>
              <h3>Quality Without Compromise</h3>
              <p>From paper weight to binding, we obsess over every detail because your memories deserve the best.</p>
            </div>
            <div className="info-value">
              <span className="info-value-icon">🌍</span>
              <h3>Accessible to All</h3>
              <p>We keep our prices fair and our shipping free because everyone deserves to preserve their family's story.</p>
            </div>
          </div>
        </section>

        <section className="info-section info-cta-section">
          <h2>Ready to Capture Dad's Story?</h2>
          <p>Join 50,000+ families who have already preserved their most precious memories.</p>
          <Link to="/collections/all" className="btn-primary">Shop Now →</Link>
        </section>
      </div>
    </div>
  );
}
