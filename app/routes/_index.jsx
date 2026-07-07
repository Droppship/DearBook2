import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense, useState, useEffect, useRef} from 'react';
import {Image, Money} from '@shopify/hydrogen';

export const meta = () => {
  return [
    {title: 'DearBook | Dad, Tell Me Your Story — The #1 Gift for Fathers'},
    {
      name: 'description',
      content:
        "The perfect gift for your father — a beautifully crafted guided journal with 200+ heartfelt questions to capture his precious memories forever. Rated 4.9/5 by 50,000+ families.",
    },
    {property: 'og:title', content: 'DearBook | Dad, Tell Me Your Story'},
    {property: 'og:description', content: "The perfect gift for Dad — a guided journal with 200+ questions to capture his memories forever."},
    {property: 'og:url', content: 'https://dearbook.ca'},
    {property: 'og:type', content: 'website'},
    {name: 'twitter:card', content: 'summary_large_image'},
    {name: 'robots', content: 'index, follow'},
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
      <WhyChooseUsSection />
      <TestimonialsSection />
      <GiftSection />
      <ComparisonSection />
      <GuaranteeSection />
      <FAQSection />
      <FinalCTA featuredProduct={featuredProduct} />
    </div>
  );
}

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.unobserve(el); } },
      {threshold: 0.1, ...options}
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedSection({children, className = '', delay = 0}) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`fade-in-section ${inView ? 'visible' : ''} ${className}`}
      style={delay ? {'--delay': `${delay}ms`} : undefined}
    >
      {children}
    </div>
  );
}

function HeroSection({featuredProduct}) {
  return (
    <section className="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-badge">🎁 Father's Day — Limited Edition</div>

          <h1 className="hero-title">
            Dad,{' '}
            <span>Tell Me</span>
            {' '}Your Story
          </h1>

          <p className="hero-subtitle">
            A beautifully crafted guided journal with over 200 heartfelt
            questions to capture your father's precious memories… before
            it's too late.
          </p>

          <div className="hero-rating">
            <span className="stars">★★★★★</span>
            <span className="hero-rating-text">4.9/5 — Loved by 50,000+ families</span>
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
                    <span className="hero-price-badge">SAVE 30%</span>
                  </div>
                );
              }}
            </Await>
          </Suspense>

          <div className="hero-cta-group">
            <Suspense
              fallback={
                <Link to="/collections/all" className="btn-primary btn-pulse">
                  Order Now — Limited Stock →
                </Link>
              }
            >
              <Await resolve={featuredProduct}>
                {(data) => {
                  const product = data?.products?.nodes?.[0];
                  const to = product ? `/products/${product.handle}` : '/collections/all';
                  return (
                    <Link to={to} className="btn-primary btn-pulse">
                      Order Now — Limited Stock →
                    </Link>
                  );
                }}
              </Await>
            </Suspense>
            <span className="hero-cta-note">Order today, ships within 24h</span>
          </div>

          <div className="hero-trust-badges">
            <span className="hero-trust-badge">🔒 Secure Payment</span>
            <span className="hero-trust-badge">🚚 Free Shipping</span>
            <span className="hero-trust-badge">↩️ 30-Day Guarantee</span>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-image-glow" />
          <img
            src="https://cdn.shopify.com/s/files/1/0817/6422/1167/files/Screenshot_2026-05-25_21.55.43-removebg-preview.png"
            className="hero-book-img"
            alt="Dad, I Want to Hear Your Story — Guided Journal"
            width="420"
            height="560"
            loading="eager"
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
      <span className="hero-price-badge">SAVE 30%</span>
    </div>
  );
}

function TrustBar() {
  const items = [
    {icon: '👨‍👧', label: '50,000+', sub: 'Happy Families'},
    {icon: '⭐', label: '4.9/5', sub: 'Customer Rating'},
    {icon: '🚚', label: 'Free', sub: 'Shipping'},
    {icon: '🛡️', label: '30-Day', sub: 'Money-Back Guarantee'},
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

function FeaturesSection() {
  const features = [
    {
      icon: '📝',
      title: '200+ Guided Questions',
      desc: "Carefully chosen questions to uncover the most precious stories from your father's life, page after page.",
    },
    {
      icon: '💎',
      title: 'Premium Quality',
      desc: "Elegant hardcover, thick high-quality paper. An object built to last a lifetime and beyond.",
    },
    {
      icon: '💙',
      title: 'Eternal Memories',
      desc: "Create a family legacy that your children and grandchildren will treasure for generations to come.",
    },
    {
      icon: '🎁',
      title: 'Unforgettable Gift',
      desc: "The most touching gift you can give — for Father's Day, a birthday, or Christmas.",
    },
  ];

  return (
    <section className="section section-white" id="features">
      <div className="section-inner">
        <AnimatedSection>
          <h2 className="section-title">Why This Journal is Unique</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            More than a notebook — a bridge between generations that transforms
            simple conversations into treasures that last forever.
          </p>
        </AnimatedSection>
        <div className="features-grid">
          {features.map((f, i) => (
            <AnimatedSection key={f.title} delay={i * 100}>
              <div className="feature-card">
                <span className="feature-icon">{f.icon}</span>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

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
        <AnimatedSection>
          <h2 className="section-title">A Peek Inside the Journal</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            Here are just a few of the 200+ heartfelt questions waiting for your father…
          </p>
        </AnimatedSection>
        <div className="questions-grid">
          {questions.map((q, i) => (
            <AnimatedSection key={i} delay={i * 80}>
              <div className="question-card">
                <div className="question-number">Question {i + 1}</div>
                <p className="question-text">"{q}"</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <p className="questions-note">
          + 194 more equally touching questions to explore a lifetime of stories…
        </p>
      </div>
    </section>
  );
}

function WhyChooseUsSection() {
  const reasons = [
    {
      icon: '✍️',
      title: 'Thoughtfully Curated Questions',
      desc: 'Each question was crafted with psychologists and family therapists to draw out the most meaningful stories.',
    },
    {
      icon: '📖',
      title: 'Beautiful, Lasting Design',
      desc: 'Premium hardcover with gold foil details. Thick, acid-free paper that resists yellowing for decades.',
    },
    {
      icon: '🌍',
      title: 'Trusted Worldwide',
      desc: '50,000+ families across 12 countries have used DearBook to preserve their most precious memories.',
    },
    {
      icon: '❤️',
      title: 'Brings Families Closer',
      desc: '94% of our customers report having deeper, more meaningful conversations after using our journal.',
    },
    {
      icon: '📦',
      title: 'Ready to Gift',
      desc: 'Arrives in elegant gift packaging. No wrapping needed — just hand it over and watch the magic happen.',
    },
    {
      icon: '🔄',
      title: 'Risk-Free Purchase',
      desc: "30-day money-back guarantee. If you're not moved by this journal, we'll refund you in full.",
    },
  ];

  return (
    <section className="section section-white" id="why-us">
      <div className="section-inner">
        <AnimatedSection>
          <h2 className="section-title">Why 50,000+ Families Choose DearBook</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            We obsess over every detail so that your gift creates an unforgettable moment.
          </p>
        </AnimatedSection>
        <div className="why-grid">
          {reasons.map((r, i) => (
            <AnimatedSection key={r.title} delay={i * 80}>
              <div className="why-card">
                <span className="why-icon">{r.icon}</span>
                <div>
                  <h3 className="why-title">{r.title}</h3>
                  <p className="why-desc">{r.desc}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const reviews = [
    {
      text: "I gave this journal to my dad for Father's Day. He cried when he flipped through it. We spent hours filling it in together — it's the most beautiful memory we've ever made.",
      author: 'Marie L.',
      location: 'Montreal',
      initial: 'M',
      tag: "Father's Day",
      verified: true,
    },
    {
      text: "My father has early-stage Alzheimer's. This journal allowed us to capture his memories while he still could. It's priceless. Thank you from the bottom of my heart.",
      author: 'Thomas B.',
      location: 'Toronto',
      initial: 'T',
      tag: 'Moving Testimonial',
      verified: true,
    },
    {
      text: "Amazing gift for my dad's birthday! He loved answering the questions and I discovered things about him I never knew after 35 years! I recommend it 1000%.",
      author: 'Sophie M.',
      location: 'Vancouver',
      initial: 'S',
      tag: 'Birthday',
      verified: true,
    },
  ];

  return (
    <section className="section section-cream" id="testimonials">
      <div className="section-inner">
        <AnimatedSection>
          <h2 className="section-title">What Families Are Saying</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            Over 50,000 families have already given this unforgettable gift.
          </p>
        </AnimatedSection>
        <div className="testimonials-grid">
          {reviews.map((r, i) => (
            <AnimatedSection key={r.author} delay={i * 120}>
              <div className="testimonial-card">
                <div className="testimonial-stars">★★★★★</div>
                <div className="testimonial-quote">&ldquo;</div>
                <p className="testimonial-text">{r.text}</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{r.initial}</div>
                  <div>
                    <p className="testimonial-name">{r.author}</p>
                    <p className="testimonial-meta">
                      {r.location} &middot; {r.tag}
                    </p>
                    {r.verified && (
                      <p className="testimonial-verified">✓ Verified Purchase</p>
                    )}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    <section className="section section-white">
      <div className="section-inner">
        <AnimatedSection>
          <h2 className="section-title">The Perfect Gift for Every Occasion</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            Whether it's Father's Day, a birthday, or Christmas — this journal
            is always the gift everyone remembers.
          </p>
        </AnimatedSection>
        <div className="gift-grid">
          {occasions.map((o, i) => (
            <AnimatedSection key={o.title} delay={i * 60}>
              <div className="gift-card">
                <span className="gift-icon">{o.icon}</span>
                <p className="gift-title">{o.title}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  const rows = [
    {feature: '200+ guided questions', us: true, others: false},
    {feature: 'Premium hardcover', us: true, others: false},
    {feature: 'Acid-free archival paper', us: true, others: false},
    {feature: 'Gift-ready packaging', us: true, others: false},
    {feature: '30-day money-back guarantee', us: true, others: false},
    {feature: 'Free shipping', us: true, others: false},
    {feature: 'Questions crafted by therapists', us: true, others: false},
    {feature: 'Rating 4.9/5 stars', us: true, others: false},
  ];

  return (
    <section className="section section-cream">
      <div className="section-inner">
        <AnimatedSection>
          <h2 className="section-title">DearBook vs. The Others</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            See why families choose DearBook over generic journals.
          </p>
        </AnimatedSection>
        <AnimatedSection>
          <div className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="comparison-us">📖 DearBook</th>
                  <th>Generic Journals</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.feature}>
                    <td>{r.feature}</td>
                    <td className="comparison-us">
                      <span className="comparison-yes">✓</span>
                    </td>
                    <td>
                      <span className="comparison-no">✗</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function GuaranteeSection() {
  return (
    <section className="guarantee-section">
      <div className="guarantee-inner">
        <AnimatedSection>
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
          <h2 className="guarantee-title">100% Satisfaction Guaranteed</h2>
          <p className="guarantee-text">
            We are so confident you will love this journal that we offer a full
            30-day money-back guarantee. If for any reason you are not satisfied,
            contact us and we will refund you in full — no questions asked.
            Your purchase is completely risk-free.
          </p>
          <div className="guarantee-icons">
            <div className="guarantee-icon-item">
              <span>🔒</span>
              <span>Secure Checkout</span>
            </div>
            <div className="guarantee-icon-item">
              <span>🚚</span>
              <span>Free Shipping</span>
            </div>
            <div className="guarantee-icon-item">
              <span>↩️</span>
              <span>Easy Returns</span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: 'How many questions does the journal contain?',
      a: 'The journal contains over 200 carefully selected questions, organized into thoughtful categories covering childhood, family, career, love, life lessons, and more.',
    },
    {
      q: 'Is this suitable for fathers of all ages?',
      a: "Absolutely! Whether your father is 40 or 90, the questions are designed to work for any age. Many of our customers have given it to grandfathers as well — it's never too early or too late to capture these stories.",
    },
    {
      q: 'How long does shipping take?',
      a: 'We ship within 24 hours of your order. Standard delivery takes 5-8 business days to Canada and the US. Express shipping (2-3 days) is also available at checkout.',
    },
    {
      q: 'What is your return policy?',
      a: "We offer a 30-day money-back guarantee. If you're not satisfied for any reason, simply contact us and we'll issue a full refund — no questions asked.",
    },
    {
      q: 'Is this a good gift for someone who doesn\'t like to write?',
      a: "Yes! The questions are designed to be simple and inviting. Many customers report that even reluctant writers end up loving the experience once they start. The guided format makes it easy — just answer one question at a time.",
    },
    {
      q: 'What is the quality of the journal?',
      a: 'DearBook is a premium hardcover journal with thick, acid-free paper designed to last for decades. It features gold foil details and comes in beautiful gift-ready packaging.',
    },
    {
      q: 'Can I order multiple copies?',
      a: 'Of course! Many customers order multiple copies for different family members. Bulk discounts are available for orders of 3 or more — contact us for details.',
    },
  ];

  return (
    <section className="section section-white" id="faq">
      <div className="section-inner">
        <AnimatedSection>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="section-divider" />
          <p className="section-subtitle">
            Everything you need to know about DearBook.
          </p>
        </AnimatedSection>
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({question, answer}) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' faq-item-open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(!open)} aria-expanded={open}>
        {question}
        <span className={`faq-chevron${open ? ' open' : ''}`}>▼</span>
      </button>
      <div className={`faq-answer${open ? ' open' : ''}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

function FinalCTA({featuredProduct}) {
  return (
    <section className="final-cta">
      <div className="final-cta-inner">
        <AnimatedSection>
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
              <Link to="/collections/all" className="btn-primary btn-pulse">
                Order Now — Free Shipping →
              </Link>
            }
          >
            <Await resolve={featuredProduct}>
              {(data) => {
                const product = data?.products?.nodes?.[0];
                const to = product ? `/products/${product.handle}` : '/collections/all';
                return (
                  <Link to={to} className="btn-primary btn-pulse">
                    Order Now — Free Shipping →
                  </Link>
                );
              }}
            </Await>
          </Suspense>
          <div className="final-cta-trust">
            <span>🔒 Secure Payment</span>
            <span>🚚 Free Shipping</span>
            <span>↩️ 30-Day Guarantee</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

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
