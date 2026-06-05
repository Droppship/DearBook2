import {useLoaderData, Link, Form} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {Image, Money, VariantSelector} from '@shopify/hydrogen';
import {useState} from 'react';

export const meta = ({data}) => {
  return [
    {title: `DearBook | ${data?.product?.title ?? 'Product'}`},
    {
      name: 'description',
      content:
        data?.product?.description?.slice(0, 155) ??
        "A guided journal to capture your father's story.",
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
      text: "Perfect gift for Father's Day! My dad loved answering all the questions. We discovered incredible stories he had never shared before.",
      name: 'Claire D.',
      location: 'Montreal',
      date: '2 weeks ago',
    },
    {
      stars: 5,
      text: "The quality of the book is excellent. The questions are thoughtful and touching. My dad and I spent wonderful hours together filling it in.",
      name: 'Lucas M.',
      location: 'Toronto',
      date: '1 month ago',
    },
    {
      stars: 5,
      text: "I gave it to my stepfather for his birthday. He was very moved. A gift that is worth so much more than its price!",
      name: 'Emma B.',
      location: 'Vancouver',
      date: '3 weeks ago',
    },
    {
      stars: 4,
      text: "Beautiful book, well bound. The questions are really well chosen. Fast delivery and careful packaging.",
      name: 'Pierre L.',
      location: 'Calgary',
      date: '2 months ago',
    },
    {
      stars: 5,
      text: "My father is 78 and is starting to forget some memories. This book allowed us to capture so many precious stories. Thank you so much.",
      name: 'Isabelle K.',
      location: 'Ottawa',
      date: '1 week ago',
    },
    {
      stars: 5,
      text: "Easy to order, delivered in 7 days, product exactly as described. Very satisfied! I'm going to get one for my mother-in-law too.",
      name: 'Julien R.',
      location: 'Edmonton',
      date: '3 weeks ago',
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
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/collections/all">Shop</Link>
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
              <span className="badge badge-instock">✓ In Stock</span>
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
              4.9/5 ({staticReviews.length * 474} reviews)
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
                <span className="product-saving">Save 30%</span>
              </>
            )}
          </div>

          <div className="product-divider" />

          {/* Variant Selector — hidden if single "Default Title" variant */}
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
          <Form method="POST" action="/cart" reloadDocument>
            <input
              type="hidden"
              name="cartFormInput"
              value={JSON.stringify({
                action: 'LinesAdd',
                inputs: {lines: [{merchandiseId: selectedVariant?.id || '', quantity: 1}]},
              })}
            />
            <button
              type="submit"
              className="product-add-to-cart"
              disabled={!selectedVariant?.availableForSale || !selectedVariant?.id}
            >
              {selectedVariant?.availableForSale
                ? '🛒 Add to Cart'
                : 'Out of Stock'}
            </button>
          </Form>

          {/* Trust Badges */}
          <div className="product-trust-badges">
            <div className="product-trust-badge">
              <span className="product-trust-badge-icon">🔒</span>
              <span className="product-trust-badge-text">Secure Payment</span>
            </div>
            <div className="product-trust-badge">
              <span className="product-trust-badge-icon">↩️</span>
              <span className="product-trust-badge-text">30-Day Returns</span>
            </div>
            <div className="product-trust-badge">
              <span className="product-trust-badge-icon">😊</span>
              <span className="product-trust-badge-text">Happy Dad Guaranteed</span>
            </div>
          </div>

          {/* Feature Checklist */}
          <ul className="product-features-list">
            <li>Over 200 carefully selected guided questions</li>
            <li>Premium high-quality hardcover</li>
            <li>Ideal format for comfortable writing</li>
            <li>Perfect gift for Father's Day</li>
          </ul>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="product-tabs">
        <div className="product-tabs-header">
          {['description', 'details', 'reviews'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`product-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'description'
                ? 'Description'
                : tab === 'details'
                ? 'Product Details'
                : `Customer Reviews (${staticReviews.length * 474})`}
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
                  <span>Hardcover</span>
                </li>
                <li>
                  <strong>Pages</strong>
                  <span>200+ pages of guided questions</span>
                </li>
                <li>
                  <strong>Dimensions</strong>
                  <span>8 × 5.5 in</span>
                </li>
                <li>
                  <strong>Language</strong>
                  <span>English</span>
                </li>
                <li>
                  <strong>Packaging</strong>
                  <span>Careful gift packaging included</span>
                </li>
                <li>
                  <strong>Guarantee</strong>
                  <span>30-day satisfaction guarantee</span>
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
                    {staticReviews.length * 474} reviews
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
                    <div className="review-verified">✓ Verified Purchase · {r.date}</div>
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
      <h2>A Gift That Captures a Lifetime</h2>
      <p>
        <em>Dad, I Want to Hear Your Story</em> is so much more than a simple journal.
        It's an invitation for your father to share his story, his dreams,
        his memories, and the lessons he's learned throughout his life.
      </p>
      <h3>What You'll Discover</h3>
      <ul>
        <li>The childhood stories your father may have never shared</li>
        <li>The moments that shaped who he is today</li>
        <li>His dreams, hopes, and regrets</li>
        <li>The advice he would give you if he could start over</li>
        <li>His love story with your mother</li>
      </ul>
      <p>
        This journal is designed to be filled at his own pace, question by
        question, memory by memory. Each page is a window into his life
        — and a treasure your family will cherish forever.
      </p>
      <h3>A Quality Object</h3>
      <p>
        The premium hardcover and thick high-quality paper make this
        journal an object built to last for decades. Not just a notebook
        — a true family heirloom.
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
