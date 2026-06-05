import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense, useState} from 'react';
import {Image, Money} from '@shopify/hydrogen';

export const meta = () => {
  return [
    {title: 'DearBook | Dad, Tell Me Your Story'},
    {
      name: 'description',
      content:
        "The perfect gift for your father — a guided journal with 200+ questions to capture his precious memories forever.",
    },
    {property: 'og:title', content: 'DearBook | Dad, Tell Me Your Story'},
    {property: 'og:description', content: "The perfect gift for Dad — a guided journal with 200+ questions to capture his memories forever."},
    {property: 'og:url', content: 'https://dearbook.ca'},
    {name: 'twitter:card', content: 'summary_large_image'},
  ];
};

export async function loader({context}) {
  const {storefront} = context;
  const featuredProduct = storefront.query(FEATURED_PRODUCT_QUERY, {
    cache: storefront.CacheNone(),
  });
  return defer({featuredProduct});
}

export default function Homepage() {
  const {featuredProduct} = useLoaderData();
  return (
    <div className="home">
      <HeroSection featuredProduct={featuredProduct} />
      <TrustBar />
      <FeaturesSection />
      <SampleQuestionsSection />
      <TestimonialsSection />
      <GiftSection />
      <GuaranteeSection />
      <FinalCTA featuredProduct={featuredProduct} />
    </div>
  );
}

/* ─── HERO ──────────────────────────────────────────────── */
function HeroSection({featuredProduct}) {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-badge">🎁 Father's Day — Special Edition</div>

          <h1 className="hero-title">
            Dad,{' '}
            <span>Tell Me</span>
            {' '}Your Story
          </h1>

          <p className="hero-subtitle">
            A guided journal with over 200 heartfelt questions to capture
            your father's precious memories… before it's too late.
          </p>

          <div className="hero-rating">
            <span className="stars">★★★★★</span>
            <span className="hero-rating-text">4.9/5 · Over 50,000 families</span>
          </div>

          <Suspense fallback={<StaticPrice />}>
            <Await resolve={featuredProduct}>
              {(data) => {
                const variant = data?.products?.nodes?.[0]?.variants?.nodes?.[0];
                return (
                  <div className="hero-price">
                    <span className="hero-price-current">
                      {variant?.price ? <Money data={variant.price} /> : '$29.99'}
                    </span>
                    {variant?.compareAtPrice && (
                      <span className="hero-price-original">
                        <Money data={variant.compareAtPrice} />
                      </span>
                    )}
                    <span className="hero-price-badge">−30%</span>
                  </div>
                );
              }}
            </Await>
          </Suspense>

          <div className="hero-cta-group">
            <Suspense
              fallback={
                <Link to="/collections/all" className="btn-primary">
                  Order Now →
                </Link>
              }
            >
              <Await resolve={featuredProduct}>
                {(data) => {
                  const product = data?.products?.nodes?.[0];
                  const to = product ? `/products/${product.handle}` : '/collections/all';
                  return (
                    <Link to={to} className="btn-primary">
                      Order Now →
                    </Link>
                  );
                }}
              </Await>
            </Suspense>
          </div>

          <div className="hero-trust-badges">
            <span className="hero-trust-badge">🔒 Secure Payment</span>
            <span className="hero-trust-badge">↩️ 30-Day Guarantee</span>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-image-glow" />
          <img
            src="https://cdn.shopify.com/s/files/1/0817/6422/1167/files/Screenshot_2026-05-25_21.55.43-removebg-preview.png"
            className="hero-book-img"
            alt="Dad, I Want to Hear Your Story"
          />
        </div>
      </div>
    </section>
  );
}

function StaticPrice() {
  return (
    <div className="hero-price">
      <span className="hero-price-current">$29.99</span>
      <span className="hero-price-original">$42.99</span>
      <span className="hero-price-badge">−30%</span>
    </div>
  );
}

function BookPlaceholder() {
  return (
    <div className="hero-book-placeholder">
      <span>📖</span>
      <span style={{fontSize: '0.9rem'}}>Loading…</span>
    </div>
  );
}

/* ─── TRUST BAR ─────────────────────────────────────────── */
function TrustBar() {
  const items = [
    {icon: '👨‍👧', label: '50,000+', sub: 'Families'},
    {icon: '⭐', label: '4.9/5', sub: 'Customer Reviews'},
    {icon: '🔒', label: 'Payment', sub: '100% Secure'},
    {icon: '↩️', label: 'Guarantee', sub: '30 Days'},
  ];
  return (
    <div className="trust-bar">
      <div className="trust-bar-inner">
        {items.map(({icon, label, sub}) => (
          <div className="trust-bar-item" key={label}>
            <span className="trust-bar-item-icon">{icon}</span>
            <div>
              <strong>{label}</strong>
              {sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── FEATURES ──────────────────────────────────────────── */
function FeaturesSection() {
  const features = [
    {
      icon: '📝',
      title: '200+ Guided Questions',
      desc: "Carefully chosen questions to uncover the most precious stories from your father's life, page after page.",
    },
    {
      icon: '💙',
      title: 'Eternal Memories',
      desc: "Create a family legacy that your children and grandchildren will treasure for generations to come.",
    },
    {
      icon: '📚',
      title: 'Premium Quality',
      desc: "Elegant hardcover, thick high-quality paper. An object built to last a lifetime.",
    },
    {
      icon: '🎁',
      title: 'Unforgettable Gift',
      desc: "The most touching gift you can give — for Father's Day, a birthday, or Christmas.",
    },
  ];

  return (
    <section className="section section-white">
      <div className="section-inner">
        <h2 className="section-title">Why This Journal is Unique</h2>
        <div className="section-divider" />
        <p className="section-subtitle">
          A book designed to turn simple conversations into precious memories
          that will last through the generations.
        </p>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <span className="feature-icon">{f.icon}</span>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SAMPLE QUESTIONS ──────────────────────────────────── */
function SampleQuestionsSection() {
  const questions = [
    "What was your childhood nickname, and how did you get it?",
    "What is the most important lesson life has taught you?",
    "What childhood memory still makes you smile today?",
    "How did you meet Mom, and what drew you to her?",
    "What moment in your life are you most proud of?",
    "What do you wish you had known earlier in life?",
  ];

  return (
    <section className="section section-cream">
      <div className="section-inner">
        <h2 className="section-title">A Peek Inside the Journal</h2>
        <div className="section-divider" />
        <p className="section-subtitle">
          Here are a few examples of the 200+ questions waiting for your father…
        </p>
        <div className="questions-grid">
          {questions.map((q, i) => (
            <div className="question-card" key={i}>
              <div className="question-number">Question {i + 1}</div>
              <p className="question-text">"{q}"</p>
            </div>
          ))}
        </div>
        <p className="questions-note">
          + 194 more equally touching questions to explore a lifetime of stories…
        </p>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ──────────────────────────────────────── */
function TestimonialsSection() {
  const reviews = [
    {
      text: "I gave this journal to my dad for Father's Day. He cried when he flipped through it. We spent hours filling it in together — it's the most beautiful memory we've ever made.",
      author: 'Marie L.',
      location: 'Montreal',
      initial: 'M',
      tag: "Father's Day",
    },
    {
      text: "My father has early-stage Alzheimer's. This journal allowed us to capture his memories while he still could. It's priceless. Thank you from the bottom of my heart.",
      author: 'Thomas B.',
      location: 'Toronto',
      initial: 'T',
      tag: 'Moving Testimonial',
    },
    {
      text: "Amazing gift for my dad's birthday! He loved answering the questions and I discovered things about him I never knew after 35 years! I recommend it 1000%.",
      author: 'Sophie M.',
      location: 'Vancouver',
      initial: 'S',
      tag: 'Birthday',
    },
  ];

  return (
    <section className="section section-white">
      <div className="section-inner">
        <h2 className="section-title">What Families Are Saying</h2>
        <div className="section-divider" />
        <p className="section-subtitle">
          Over 50,000 families have already given this unforgettable gift.
        </p>
        <div className="testimonials-grid">
          {reviews.map((r) => (
            <div className="testimonial-card" key={r.author}>
              <div className="testimonial-stars">★★★★★</div>
              <div className="testimonial-quote">"</div>
              <p className="testimonial-text">{r.text}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{r.initial}</div>
                <div>
                  <p className="testimonial-name">{r.author}</p>
                  <p className="testimonial-meta">
                    {r.location} · {r.tag}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── GIFT OCCASIONS ────────────────────────────────────── */
function GiftSection() {
  const occasions = [
    {icon: '👨‍👧', title: "Father's Day"},
    {icon: '🎂', title: 'Birthday'},
    {icon: '🎄', title: 'Christmas'},
    {icon: '💝', title: 'Surprise Gift'},
    {icon: '👴', title: 'Grandfather'},
    {icon: '🫂', title: 'Stepfather'},
  ];

  return (
    <section className="section section-cream">
      <div className="section-inner">
        <h2 className="section-title">The Perfect Gift for Every Occasion</h2>
        <div className="section-divider" />
        <p className="section-subtitle">
          Whether it's Father's Day, a birthday, or Christmas — this journal
          is always the gift everyone remembers.
        </p>
        <div className="gift-grid">
          {occasions.map((o) => (
            <div className="gift-card" key={o.title}>
              <span className="gift-icon">{o.icon}</span>
              <p className="gift-title">{o.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── GUARANTEE ─────────────────────────────────────────── */
function GuaranteeSection() {
  return (
    <section className="guarantee-section">
      <div className="guarantee-inner">
        <div className="guarantee-badge-wrap">
          <div className="guarantee-badge">
            <span className="guarantee-badge-icon">🛡️</span>
            <span className="guarantee-badge-text">
              30-Day
              <br />
              Guarantee
            </span>
          </div>
        </div>
        <h2 className="guarantee-title">Satisfaction Guaranteed</h2>
        <p className="guarantee-text">
          We are so confident you will love this journal that we offer a full
          30-day money-back guarantee. If for any reason you are not satisfied,
          contact us and we will refund you in full — no questions asked.
        </p>
      </div>
    </section>
  );
}


/* ─── FINAL CTA ─────────────────────────────────────────── */
function FinalCTA({featuredProduct}) {
  return (
    <section className="final-cta">
      <div className="final-cta-inner">
        <h2 className="final-cta-title">
          Don't Let{' '}
          <span>Dad's Stories</span>
          {' '}Disappear
        </h2>
        <p className="final-cta-subtitle">
          Every day that passes is one less story to tell. Give him this journal
          today and capture the memories that truly matter — for him and for
          your whole family.
        </p>
        <Suspense
          fallback={
            <Link to="/collections/all" className="btn-primary">
              Order Now →
            </Link>
          }
        >
          <Await resolve={featuredProduct}>
            {(data) => {
              const product = data?.products?.nodes?.[0];
              const to = product ? `/products/${product.handle}` : '/collections/all';
              return (
                <Link to={to} className="btn-primary">
                  Order Now →
                </Link>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </section>
  );
}

/* ─── GRAPHQL ───────────────────────────────────────────── */
const FEATURED_PRODUCT_QUERY = `#graphql
  query FeaturedProduct {
    products(first: 1, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
        featuredImage {
          id
          url
          altText
          width
          height
        }
        variants(first: 1) {
          nodes {
            id
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;
