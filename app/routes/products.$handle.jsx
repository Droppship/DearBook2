import {useLoaderData, Link, Form} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {Image, Money, VariantSelector} from '@shopify/hydrogen';
import {useState, useEffect, useRef} from 'react';

export const meta = ({data}) => {
  return [
    {title: `DearBook | ${data?.product?.title ?? 'Product'} — The #1 Gift for Fathers`},
    {
      name: 'description',
      content:
        data?.product?.description?.slice(0, 155) ??
        "A guided journal to capture your father's story. 200+ questions, premium hardcover. Rated 4.9/5.",
    },
    {property: 'og:title', content: `DearBook | ${data?.product?.title ?? 'Product'}`},
    {name: 'robots', content: 'index, follow'},
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

  const deliveryDate = getEstimatedDelivery();

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

  const productFaqs = [
    {q: 'How many questions are in the journal?', a: 'Over 200 carefully curated questions spanning childhood, family, career, love, life lessons, and legacy.'},
    {q: 'What is the paper quality like?', a: 'We use thick, acid-free archival paper (120gsm) that resists yellowing and is designed to last for decades.'},
    {q: 'Is this suitable for grandfathers too?', a: 'Absolutely! The questions are designed for any father figure — dads, grandfathers, stepfathers, and mentors.'},
    {q: 'Does it come in gift packaging?', a: 'Yes! Every DearBook arrives in elegant, ready-to-gift packaging with a personal note card included.'},
    {q: 'What are the dimensions?', a: 'The journal measures 8 × 5.5 inches — the ideal size for comfortable writing and shelf storage.'},
  ];

  return (
    <div className="product-page">
      <div className="product-breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/collections/all">Shop</Link>
        <span>›</span>
        <span>{product.title}</span>
      </div>

      <div className="product-layout">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="product-gallery-main">
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
            <div className="product-gallery-badge">BESTSELLER</div>
          </div>
          <div className="product-gallery-trust">
            <span>🔒 Secure Payment</span>
            <span>🚚 Free Shipping</span>
            <span>↩️ 30-Day Returns</span>
          </div>
        </div>

        {/* Info Panel */}
        <div className="product-info-panel">
          <div className="product-badge-row">
            <span className="badge badge-bestseller">🏆 Bestseller</span>
            {selectedVariant?.availableForSale && (
              <span className="badge badge-instock">✓ In Stock</span>
            )}
            <span className="badge badge-limited">🔥 Selling Fast</span>
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
                <span className="product-saving">You save 30%</span>
              </>
            )}
          </div>

          {/* Benefits */}
          <div className="product-benefits">
            <div className="product-benefit">
              <span className="product-benefit-icon">📝</span>
              <div>
                <strong>200+ Guided Questions</strong>
                <span>Carefully crafted by family therapists</span>
              </div>
            </div>
            <div className="product-benefit">
              <span className="product-benefit-icon">💎</span>
              <div>
                <strong>Premium Hardcover</strong>
                <span>Built to last for generations</span>
              </div>
            </div>
            <div className="product-benefit">
              <span className="product-benefit-icon">🎁</span>
              <div>
                <strong>Gift-Ready Packaging</strong>
                <span>Beautiful box, ready to give</span>
              </div>
            </div>
          </div>

          <div className="product-divider" />

          {/* Stock Counter */}
          <div className="product-stock-info">
            <span className="product-stock-dot" />
            <span>Only <strong>23 left</strong> in stock — order soon</span>
          </div>

          {/* Variant Selector */}
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
                ? '🛒 Add to Cart — Free Shipping'
                : 'Out of Stock'}
            </button>
          </Form>

          {/* Delivery Estimate */}
          <div className="product-delivery">
            <span className="product-delivery-icon">🚚</span>
            <div>
              <strong>Estimated Delivery</strong>
              <span>{deliveryDate}</span>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="product-trust-badges">
            <div className="product-trust-badge">
              <span className="product-trust-badge-icon">🔒</span>
              <span className="product-trust-badge-text">Secure<br/>Payment</span>
            </div>
            <div className="product-trust-badge">
              <span className="product-trust-badge-icon">↩️</span>
              <span className="product-trust-badge-text">30-Day<br/>Returns</span>
            </div>
            <div className="product-trust-badge">
              <span className="product-trust-badge-icon">🛡️</span>
              <span className="product-trust-badge-text">Satisfaction<br/>Guaranteed</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="product-payments">
            <span className="product-payments-label">Accepted Payments</span>
            <div className="product-payments-icons">
              {['Visa', 'MC', 'Amex', 'PayPal', 'Apple Pay'].map((p) => (
                <span key={p} className="product-payment-icon">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="product-tabs">
        <div className="product-tabs-header">
          {['description', 'details', 'reviews', 'faq'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`product-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'description'
                ? '📋 Description'
                : tab === 'details'
                ? '📐 Details'
                : tab === 'reviews'
                ? `⭐ Reviews (${staticReviews.length * 474})`
                : '❓ FAQ'}
            </button>
          ))}
        </div>

        <div className="product-tab-content">
          {activeTab === 'description' && (
            <div className="product-description">
              {product.descriptionHtml ? (
                <div dangerouslySetInnerHTML={{__html: product.descriptionHtml}} />
              ) : (
                <DefaultDescription />
              )}
            </div>
          )}

          {activeTab === 'details' && (
            <div className="product-description">
              <ul className="product-details-list">
                <li><strong>Format</strong><span>Premium Hardcover</span></li>
                <li><strong>Pages</strong><span>200+ pages of guided questions</span></li>
                <li><strong>Paper</strong><span>120gsm acid-free archival paper</span></li>
                <li><strong>Dimensions</strong><span>8 &times; 5.5 inches</span></li>
                <li><strong>Language</strong><span>English</span></li>
                <li><strong>Cover</strong><span>Gold foil details on navy hardcover</span></li>
                <li><strong>Packaging</strong><span>Premium gift box included</span></li>
                <li><strong>Guarantee</strong><span>30-day money-back guarantee</span></li>
              </ul>
            </div>
          )}

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
                    <div className="review-verified">✓ Verified Purchase &middot; {r.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="product-faq-list">
              {productFaqs.map((faq, i) => (
                <ProductFAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="product-comparison-section">
        <h2 className="section-title">Why DearBook Stands Out</h2>
        <div className="section-divider" />
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
              <tr><td>200+ guided questions</td><td className="comparison-us"><span className="comparison-yes">✓</span></td><td><span className="comparison-no">✗</span></td></tr>
              <tr><td>Premium hardcover</td><td className="comparison-us"><span className="comparison-yes">✓</span></td><td><span className="comparison-no">✗</span></td></tr>
              <tr><td>Acid-free archival paper</td><td className="comparison-us"><span className="comparison-yes">✓</span></td><td><span className="comparison-no">✗</span></td></tr>
              <tr><td>Gift-ready packaging</td><td className="comparison-us"><span className="comparison-yes">✓</span></td><td><span className="comparison-no">✗</span></td></tr>
              <tr><td>30-day guarantee</td><td className="comparison-us"><span className="comparison-yes">✓</span></td><td><span className="comparison-no">✗</span></td></tr>
              <tr><td>Free shipping</td><td className="comparison-us"><span className="comparison-yes">✓</span></td><td><span className="comparison-no">✗</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Cross-sell */}
      <div className="product-upsell-section">
        <h2 className="section-title">Complete the Gift</h2>
        <div className="section-divider" />
        <p className="section-subtitle">Customers who bought this also loved</p>
        <div className="upsell-cards">
          <div className="upsell-card">
            <div className="upsell-card-badge">Bundle & Save</div>
            <h3>2-Pack Family Bundle</h3>
            <p>Get one for Dad and one for Grandpa. Save 15% on your second journal.</p>
            <Link to="/collections/all" className="btn-secondary">View Bundle →</Link>
          </div>
          <div className="upsell-card">
            <div className="upsell-card-badge">Popular</div>
            <h3>Gift Wrapping</h3>
            <p>Premium gift wrapping with a personalized handwritten note card.</p>
            <Link to="/collections/all" className="btn-secondary">Add Gift Wrap →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductFAQItem({question, answer}) {
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

function getEstimatedDelivery() {
  const now = new Date();
  const min = new Date(now);
  min.setDate(min.getDate() + 5);
  const max = new Date(now);
  max.setDate(max.getDate() + 8);
  const fmt = (d) => d.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
  return `${fmt(min)} – ${fmt(max)}`;
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
      <h3>Built to Last</h3>
      <p>
        The premium hardcover and thick, acid-free archival paper make this
        journal an object built to last for decades. Not just a notebook
        — a true family heirloom that will be passed down through generations.
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
