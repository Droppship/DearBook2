import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense, useState} from 'react';
import {Image, Money} from '@shopify/hydrogen';

export const meta = () => {
  return [
    {title: 'DearBook | Papa, Raconte-Moi Ton Histoire'},
    {
      name: 'description',
      content:
        "Le cadeau parfait pour votre père — un journal guidé avec plus de 200 questions pour capturer ses précieux souvenirs à jamais. Livraison gratuite sur dearbook.ca",
    },
    {property: 'og:title', content: 'DearBook | Papa, Raconte-Moi Ton Histoire'},
    {property: 'og:description', content: "Le cadeau parfait pour Papa — un journal guidé avec 200+ questions pour capturer ses souvenirs pour toujours."},
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
          <div className="hero-badge">🎁 Fête des Pères — Édition Spéciale</div>

          <h1 className="hero-title">
            Papa,{' '}
            <span>Raconte-Moi</span>
            {' '}Ton Histoire
          </h1>

          <p className="hero-subtitle">
            Un journal guidé avec plus de 200 questions touchantes pour capturer
            les souvenirs précieux de votre père… avant qu'il ne soit trop tard.
          </p>

          <div className="hero-rating">
            <span className="stars">★★★★★</span>
            <span className="hero-rating-text">4.9/5 · Plus de 50 000 familles</span>
          </div>

          <Suspense fallback={<StaticPrice />}>
            <Await resolve={featuredProduct}>
              {(data) => {
                const variant = data?.products?.nodes?.[0]?.variants?.nodes?.[0];
                return (
                  <div className="hero-price">
                    <span className="hero-price-current">
                      {variant?.price ? <Money data={variant.price} /> : '29,99 €'}
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
                  Commander Maintenant →
                </Link>
              }
            >
              <Await resolve={featuredProduct}>
                {(data) => {
                  const product = data?.products?.nodes?.[0];
                  const to = product ? `/products/${product.handle}` : '/collections/all';
                  return (
                    <Link to={to} className="btn-primary">
                      Commander Maintenant →
                    </Link>
                  );
                }}
              </Await>
            </Suspense>
          </div>

          <div className="hero-trust-badges">
            <span className="hero-trust-badge">🔒 Paiement Sécurisé</span>
            <span className="hero-trust-badge">↩️ Garantie 30 Jours</span>
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
      <span className="hero-price-current">29,99 €</span>
      <span className="hero-price-original">42,99 €</span>
      <span className="hero-price-badge">−30%</span>
    </div>
  );
}

function BookPlaceholder() {
  return (
    <div className="hero-book-placeholder">
      <span>📖</span>
      <span style={{fontSize: '0.9rem'}}>Chargement…</span>
    </div>
  );
}

/* ─── TRUST BAR ─────────────────────────────────────────── */
function TrustBar() {
  const items = [
    {icon: '👨‍👧', label: '50 000+', sub: 'Familles'},
    {icon: '⭐', label: '4.9/5', sub: 'Avis clients'},
    {icon: '🔒', label: 'Paiement', sub: '100% Sécurisé'},
    {icon: '↩️', label: 'Garantie', sub: '30 Jours'},
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
      title: '200+ Questions Guidées',
      desc: "Des questions soigneusement choisies pour révéler les histoires les plus précieuses de la vie de votre père, page après page.",
    },
    {
      icon: '💙',
      title: 'Souvenirs Éternels',
      desc: "Créez un héritage familial que vos enfants et petits-enfants pourront chérir pendant des générations.",
    },
    {
      icon: '📚',
      title: 'Qualité Premium',
      desc: "Couverture rigide élégante, papier épais de haute qualité. Un objet conçu pour durer toute une vie.",
    },
    {
      icon: '🎁',
      title: 'Cadeau Inoubliable',
      desc: "Le cadeau le plus touchant que vous puissiez offrir — pour la Fête des Pères, un anniversaire ou Noël.",
    },
  ];

  return (
    <section className="section section-white">
      <div className="section-inner">
        <h2 className="section-title">Pourquoi Ce Journal est Unique</h2>
        <div className="section-divider" />
        <p className="section-subtitle">
          Un livre conçu pour transformer de simples conversations en souvenirs
          précieux qui traverseront les générations.
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
    "Quel était ton surnom d'enfant, et comment l'as-tu obtenu?",
    "Quelle est la leçon la plus importante que la vie t'ait enseignée?",
    "Quel souvenir d'enfance te fait encore sourire aujourd'hui?",
    "Comment as-tu rencontré Maman, et qu'est-ce qui t'a séduit chez elle?",
    "Quel moment de ta vie as-tu été le plus fier de toi?",
    "Qu'aurais-tu voulu que je sache plus tôt dans ma vie?",
  ];

  return (
    <section className="section section-cream">
      <div className="section-inner">
        <h2 className="section-title">Un Aperçu à l'Intérieur du Journal</h2>
        <div className="section-divider" />
        <p className="section-subtitle">
          Voici quelques exemples des 200+ questions qui attendent votre père…
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
          + 194 autres questions tout aussi touchantes pour explorer toute une vie…
        </p>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ──────────────────────────────────────── */
function TestimonialsSection() {
  const reviews = [
    {
      text: "J'ai offert ce journal à mon père pour la Fête des Pères. Il a pleuré en le feuilletant. On a passé des heures à le remplir ensemble — c'est le plus beau souvenir qu'on ait jamais créé.",
      author: 'Marie L.',
      location: 'Paris',
      initial: 'M',
      tag: 'Fête des Pères',
    },
    {
      text: "Mon père est atteint d'Alzheimer à un stade précoce. Ce journal nous a permis de capturer ses souvenirs pendant qu'il en était encore capable. C'est inestimable. Merci du fond du cœur.",
      author: 'Thomas B.',
      location: 'Lyon',
      initial: 'T',
      tag: 'Témoignage émouvant',
    },
    {
      text: "Super cadeau pour l'anniversaire de mon père! Il a adoré répondre aux questions et moi j'ai découvert des choses sur lui que je ne connaissais pas après 35 ans! Je recommande à 1000%.",
      author: 'Sophie M.',
      location: 'Bordeaux',
      initial: 'S',
      tag: 'Anniversaire',
    },
  ];

  return (
    <section className="section section-white">
      <div className="section-inner">
        <h2 className="section-title">Ce Que Disent les Familles</h2>
        <div className="section-divider" />
        <p className="section-subtitle">
          Plus de 50 000 familles ont déjà offert ce cadeau inoubliable.
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
    {icon: '👨‍👧', title: 'Fête des Pères'},
    {icon: '🎂', title: 'Anniversaire'},
    {icon: '🎄', title: 'Noël'},
    {icon: '💝', title: 'Cadeau Surprise'},
    {icon: '👴', title: 'Grand-Père'},
    {icon: '🫂', title: 'Beau-Père'},
  ];

  return (
    <section className="section section-cream">
      <div className="section-inner">
        <h2 className="section-title">Le Cadeau Parfait pour Toutes les Occasions</h2>
        <div className="section-divider" />
        <p className="section-subtitle">
          Que ce soit pour la Fête des Pères, un anniversaire ou Noël — ce journal
          est toujours le cadeau dont on se souvient.
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
              Garantie
              <br />
              30 Jours
            </span>
          </div>
        </div>
        <h2 className="guarantee-title">Satisfait ou Remboursé</h2>
        <p className="guarantee-text">
          Nous sommes tellement convaincus que vous allez adorer ce journal que
          nous offrons une garantie de remboursement complète de 30 jours. Si pour
          quelque raison que ce soit vous n'êtes pas satisfait, contactez-nous et
          nous vous remboursons intégralement — sans questions posées.
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
          Ne Laissez Pas les{' '}
          <span>Histoires de Papa</span>
          {' '}Disparaître
        </h2>
        <p className="final-cta-subtitle">
          Chaque jour qui passe est une histoire de moins. Offrez-lui ce journal
          aujourd'hui et capturez les souvenirs qui comptent vraiment — pour lui et
          pour toute votre famille.
        </p>
        <Suspense
          fallback={
            <Link to="/collections/all" className="btn-primary">
              Commander Maintenant →
            </Link>
          }
        >
          <Await resolve={featuredProduct}>
            {(data) => {
              const product = data?.products?.nodes?.[0];
              const to = product ? `/products/${product.handle}` : '/collections/all';
              return (
                <Link to={to} className="btn-primary">
                  Commander Maintenant →
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
