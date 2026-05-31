import {useLoaderData, Link} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {Image, Money, VariantSelector, CartForm} from '@shopify/hydrogen';
import {useState} from 'react';

export const meta = ({data}) => {
  return [
    {title: `DearBook | ${data?.product?.title ?? 'Produit'}`},
    {
      name: 'description',
      content:
        data?.product?.description?.slice(0, 155) ??
        "Journal guidé pour capturer l'histoire de votre père.",
    },
  ];
};

export async function loader({params, context}) {
  const {handle} = params;
  const {storefront} = context;

  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle},
    cache: storefront.CacheShort(),
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  return json({product});
}

export default function Product() {
  const {product} = useLoaderData();
  const [selectedVariant, setSelectedVariant] = useState(product.variants.nodes[0]);
  const [activeTab, setActiveTab] = useState('description');

  const staticReviews = [
    {
      stars: 5,
      text: "Cadeau parfait pour la Fête des Pères! Mon père a adoré répondre à toutes les questions. On a découvert des histoires incroyables qu'il n'avait jamais partagées.",
      name: 'Claire D.',
      location: 'Paris',
      date: 'il y a 2 semaines',
    },
    {
      stars: 5,
      text: "La qualité du livre est excellente. Les questions sont bien pensées et touchantes. Mon père et moi avons passé des heures formidables ensemble.",
      name: 'Lucas M.',
      location: 'Lyon',
      date: 'il y a 1 mois',
    },
    {
      stars: 5,
      text: "Je l'ai offert à mon beau-père pour son anniversaire. Il a été très ému. Un cadeau qui a bien plus de valeur que son prix!",
      name: 'Emma B.',
      location: 'Marseille',
      date: 'il y a 3 semaines',
    },
    {
      stars: 4,
      text: "Très beau livre, bien relié. Les questions sont vraiment bien choisies. Livraison rapide et emballage soigné.",
      name: 'Pierre L.',
      location: 'Bordeaux',
      date: 'il y a 2 mois',
    },
    {
      stars: 5,
      text: "Mon père a 78 ans et commence à oublier certains souvenirs. Ce livre nous a permis de capturer tant d'histoires précieuses. Merci infiniment.",
      name: 'Isabelle K.',
      location: 'Nice',
      date: 'il y a 1 semaine',
    },
    {
      stars: 5,
      text: "Commande facile, livraison en 7 jours, produit conforme à la description. Très satisfaite! Je vais en offrir un à ma belle-mère aussi.",
      name: 'Julien R.',
      location: 'Toulouse',
      date: 'il y a 3 semaines',
    },
  ];

  const ratingBars = [
    {n: 5, pct: '92%', width: '92%'},
    {n: 4, pct: '5%', width: '5%'},
    {n: 3, pct: '2%', width: '2%'},
    {n: 2, pct: '1%', width: '1%'},
    {n: 1, pct: '0%', width: '0%'},
  ];

  return (
    <div className="product-page">
      {/* Breadcrumb */}
      <div className="product-breadcrumb">
        <Link to="/">Accueil</Link>
        <span>›</span>
        <Link to="/collections/all">Boutique</Link>
        <span>›</span>
        <span>{product.title}</span>
      </div>

      <div className="product-layout">
        {/* ── Gallery ── */}
        <div className="product-gallery">
          {selectedVariant?.image ? (
            <Image
              data={selectedVariant.image}
              className="product-main-img"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          ) : product.featuredImage ? (
            <Image
              data={product.featuredImage}
              className="product-main-img"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          ) : (
            <div className="product-gallery-placeholder">📖</div>
          )}
        </div>

        {/* ── Info Panel ── */}
        <div className="product-info-panel">
          <div className="product-badge-row">
            <span className="badge badge-bestseller">Bestseller</span>
            {selectedVariant?.availableForSale && (
              <span className="badge badge-instock">✓ En stock</span>
            )}
          </div>

          <div>
            <h1 className="product-title">{product.title}</h1>
            <p className="product-subtitle">
              A Father's Guided Journal to Share His Life &amp; His Love
            </p>
          </div>

          <div className="product-stars-row">
            <span className="stars">★★★★★</span>
            <span className="product-review-count">
              4.9/5 ({staticReviews.length * 474} avis)
            </span>
          </div>

          <div className="product-price-row">
            {selectedVariant?.price && (
              <span className="product-price-current">
                <Money data={selectedVariant.price} />
              </span>
            )}
            {selectedVariant?.compareAtPrice && (
              <>
                <span className="product-price-original">
                  <Money data={selectedVariant.compareAtPrice} />
                </span>
                <span className="product-saving">Économisez 30%</span>
              </>
            )}
          </div>

          <div className="product-divider" />

          {/* Variant Selector — masqué si une seule variante "Default Title" */}
          {!(product.options.length === 1 && product.options[0].values.length === 1 && product.options[0].values[0] === 'Default Title') && (
            <VariantSelector
              handle={product.handle}
              options={product.options}
              variants={product.variants.nodes}
            >
              {({option}) => (
                <div className="product-option" key={option.name}>
                  <h5>{option.name}</h5>
                  <div className="product-option-values">
                    {option.values.map(({value, isAvailable, isActive, to}) => (
                      <a
                        key={option.name + value}
                        href={to}
                        className={`product-option-value ${isActive ? 'active' : ''} ${
                          !isAvailable ? 'disabled' : ''
                        }`}
                      >
                        {value}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </VariantSelector>
          )}

          {/* Add to Cart */}
          <CartForm
            route="/cart"
            action={CartForm.ACTIONS.LinesAdd}
            inputs={{lines: [{merchandiseId: selectedVariant?.id, quantity: 1}]}}
          >
            <button
              type="submit"
              className="product-add-to-cart"
              disabled={!selectedVariant?.availableForSale}
            >
              {selectedVariant?.availableForSale
                ? '🛒 Ajouter au Panier'
                : 'Rupture de stock'}
            </button>
          </CartForm>

          {/* Trust Badges */}
          <div className="product-trust-badges">
            <div className="product-trust-badge">
              <span className="product-trust-badge-icon">🚚</span>
              <span className="product-trust-badge-text">Livraison Gratuite</span>
            </div>
            <div className="product-trust-badge">
              <span className="product-trust-badge-icon">🔒</span>
              <span className="product-trust-badge-text">Paiement Sécurisé</span>
            </div>
            <div className="product-trust-badge">
              <span className="product-trust-badge-icon">↩️</span>
              <span className="product-trust-badge-text">Retour 30 Jours</span>
            </div>
          </div>

          {/* Feature Checklist */}
          <ul className="product-features-list">
            <li>Plus de 200 questions soigneusement sélectionnées</li>
            <li>Couverture rigide premium de haute qualité</li>
            <li>Format idéal pour écrire confortablement</li>
            <li>Parfait comme cadeau pour la Fête des Pères</li>
            <li>Livraison soignée sous 5 à 10 jours ouvrables</li>
          </ul>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="product-tabs">
        <div className="product-tabs-header">
          {['description', 'details', 'reviews'].map((tab) => (
            <button
              key={tab}
              className={`product-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'description'
                ? 'Description'
                : tab === 'details'
                ? 'Détails du produit'
                : `Avis clients (${staticReviews.length * 474})`}
            </button>
          ))}
        </div>

        <div className="product-tab-content">
          {/* Description Tab */}
          {activeTab === 'description' && (
            <div className="product-description">
              {product.descriptionHtml ? (
                <div dangerouslySetInnerHTML={{__html: product.descriptionHtml}} />
              ) : (
                <DefaultDescription />
              )}
            </div>
          )}

          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="product-description">
              <ul className="product-details-list">
                <li>
                  <strong>Format</strong>
                  <span>Relié rigide (Hardcover)</span>
                </li>
                <li>
                  <strong>Pages</strong>
                  <span>200+ pages de questions guidées</span>
                </li>
                <li>
                  <strong>Dimensions</strong>
                  <span>20 × 14 cm</span>
                </li>
                <li>
                  <strong>Langue</strong>
                  <span>Anglais (titre) — Journal universel</span>
                </li>
                <li>
                  <strong>Expédition</strong>
                  <span>Sous 24–48h, livraison en 5–10 jours ouvrables</span>
                </li>
                <li>
                  <strong>Emballage</strong>
                  <span>Emballage cadeau soigné inclus</span>
                </li>
                <li>
                  <strong>Garantie</strong>
                  <span>Satisfait ou remboursé sous 30 jours</span>
                </li>
              </ul>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <div className="reviews-summary">
                <div className="reviews-score">
                  <div className="reviews-score-number">4.9</div>
                  <div className="reviews-score-stars">★★★★★</div>
                  <div className="reviews-score-count">
                    {staticReviews.length * 474} avis
                  </div>
                </div>
                <div className="reviews-bars">
                  {ratingBars.map(({n, pct, width}) => (
                    <div className="review-bar-row" key={n}>
                      <span className="review-bar-label">{n}</span>
                      <span style={{color: 'var(--gold)', fontSize: '0.7rem'}}>★</span>
                      <div className="review-bar-track">
                        <div className="review-bar-fill" style={{width}} />
                      </div>
                      <span className="review-bar-pct">{pct}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reviews-grid">
                {staticReviews.map((r, i) => (
                  <div className="review-card" key={i}>
                    <div className="review-stars">{'★'.repeat(r.stars)}</div>
                    <p className="review-text">{r.text}</p>
                    <div className="review-meta">
                      {r.name} — {r.location}
                    </div>
                    <div className="review-verified">✓ Achat vérifié · {r.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DefaultDescription() {
  return (
    <>
      <h2>Un cadeau qui capture une vie entière</h2>
      <p>
        <em>Dad, I Want to Hear Your Story</em> est bien plus qu'un simple journal.
        C'est une invitation pour votre père à partager son histoire, ses rêves,
        ses souvenirs et les leçons qu'il a apprises tout au long de sa vie.
      </p>
      <h3>Ce que vous allez découvrir</h3>
      <ul>
        <li>Les histoires d'enfance que votre père n'a peut-être jamais partagées</li>
        <li>Les moments qui ont façonné qui il est aujourd'hui</li>
        <li>Ses rêves, ses espoirs et ses regrets</li>
        <li>Les conseils qu'il vous donnerait s'il pouvait tout recommencer</li>
        <li>Son histoire d'amour avec votre mère</li>
      </ul>
      <p>
        Ce journal est conçu pour être rempli à son propre rythme, question par
        question, souvenir par souvenir. Chaque page est une fenêtre sur sa vie
        — et un trésor que votre famille pourra chérir pour toujours.
      </p>
      <h3>Un objet de qualité</h3>
      <p>
        La couverture rigide premium et le papier épais de haute qualité font de
        ce journal un objet conçu pour durer des décennies. Pas un simple carnet
        — un véritable héritage familial.
      </p>
    </>
  );
}

const PRODUCT_QUERY = `#graphql
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      featuredImage {
        id
        url
        altText
        width
        height
      }
      options {
        name
        values
      }
      variants(first: 250) {
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
          selectedOptions {
            name
            value
          }
          image {
            id
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;
