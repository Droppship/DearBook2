import {useLoaderData, Link} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {
  Image,
  Money,
  VariantSelector,
  AddToCartButton,
  Analytics,
} from '@shopify/hydrogen';
import {useState} from 'react';
import dadBookStyles from '~/styles/dad-stories-book.css?url';

export const links = () => [
  {rel: 'stylesheet', href: dadBookStyles},
];

export const meta = () => [
  {title: 'Dad, I Want to Hear Your Story | DearBook2'},
  {
    name: 'description',
    content:
      'A beautiful guided journal where Dad captures his life stories, memories, and wisdom — a family heirloom for generations.',
  },
];

export async function loader({context}) {
  const {storefront} = context;

  const {product} = await storefront.query(DAD_BOOK_QUERY, {
    variables: {handle: 'dad-stories-book'},
    cache: storefront.CacheShort(),
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  return json({product});
}

const FEATURES = [
  {
    icon: '📖',
    title: '200+ Guided Prompts',
    desc: 'Thoughtful questions that spark memories — from childhood adventures to life lessons.',
  },
  {
    icon: '🏛️',
    title: 'Family Heirloom Quality',
    desc: 'Premium hardcover binding designed to be passed down for generations.',
  },
  {
    icon: '🎁',
    title: 'Perfect Gift',
    desc: "Father's Day, birthdays, Christmas — the gift that keeps giving for a lifetime.",
  },
  {
    icon: '✍️',
    title: 'Write at Your Own Pace',
    desc: 'No pressure. Fill one page a week or binge on a rainy Sunday.',
  },
];

const REVIEWS = [
  {
    name: 'Sarah M.',
    stars: 5,
    text: 'I gave this to my dad for Father\'s Day and he cried. Now we have a piece of him we\'ll treasure forever.',
  },
  {
    name: 'James T.',
    stars: 5,
    text: 'As a dad myself, filling this out was one of the most meaningful things I\'ve done for my kids.',
  },
  {
    name: 'Linda K.',
    stars: 5,
    text: 'Beautiful quality. My father finished every single page. It\'s his whole life in one book.',
  },
];

export default function DadStoriesBook() {
  const {product} = useLoaderData();
  const firstVariant = product.variants.nodes[0];
  const [selectedVariant, setSelectedVariant] = useState(firstVariant);
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const images = product.images?.nodes ?? [];
  const displayImages = images.length ? images : [product.featuredImage].filter(Boolean);

  return (
    <div className="dsb-page">

      {/* ── Breadcrumb ── */}
      <nav className="dsb-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/collections/all">Books</Link>
        <span>/</span>
        <span>Dad, I Want to Hear Your Story</span>
      </nav>

      {/* ── Hero Section ── */}
      <section className="dsb-hero">
        {/* Gallery */}
        <div className="dsb-gallery">
          <div className="dsb-gallery-main">
            {displayImages[activeImage] ? (
              <Image
                data={displayImages[activeImage]}
                aspectRatio="2/3"
                sizes="(min-width: 768px) 45vw, 90vw"
                className="dsb-main-img"
              />
            ) : (
              <div className="dsb-img-placeholder">
                <span>📘</span>
              </div>
            )}
            <div className="dsb-badge-heirloom">Family Heirloom Journal</div>
          </div>
          {displayImages.length > 1 && (
            <div className="dsb-thumbs">
              {displayImages.map((img, i) => (
                <button
                  key={img.id ?? i}
                  className={`dsb-thumb ${i === activeImage ? 'active' : ''}`}
                  onClick={() => setActiveImage(i)}
                >
                  <Image data={img} aspectRatio="2/3" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="dsb-info">
          <p className="dsb-eyebrow">Family Heirloom Journal</p>
          <h1 className="dsb-title">
            Dad,<br />
            <span>I Want to Hear</span><br />
            <span>Your Story</span>
          </h1>
          <p className="dsb-subtitle">A Father's Guided Journal to Share His Life &amp; Legacy</p>

          {/* Stars */}
          <div className="dsb-stars">
            {'★★★★★'}
            <span>4.9 · 2,400+ reviews</span>
          </div>

          {/* Price */}
          <div className="dsb-price-row">
            <strong className="dsb-price">
              <Money data={selectedVariant?.price ?? {amount: '29.99', currencyCode: 'USD'}} />
            </strong>
            {selectedVariant?.compareAtPrice && (
              <s className="dsb-compare">
                <Money data={selectedVariant.compareAtPrice} />
              </s>
            )}
            <span className="dsb-tag">Best Seller</span>
          </div>

          {/* Variants */}
          {product.options?.some(o => o.values.length > 1) && (
            <VariantSelector
              handle={product.handle}
              options={product.options}
              variants={product.variants.nodes}
            >
              {({option}) => (
                <div className="dsb-option" key={option.name}>
                  <p className="dsb-option-label">{option.name}</p>
                  <div className="dsb-option-values">
                    {option.values.map(({value, isAvailable, isActive, to}) => (
                      <a
                        key={value}
                        href={to}
                        className={`dsb-swatch ${isActive ? 'active' : ''} ${!isAvailable ? 'sold-out' : ''}`}
                      >
                        {value}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </VariantSelector>
          )}

          {/* Qty */}
          <div className="dsb-qty-row">
            <span className="dsb-option-label">Quantity</span>
            <div className="dsb-qty">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}>+</button>
            </div>
          </div>

          {/* Add to Cart */}
          <AddToCartButton
            disabled={!selectedVariant?.availableForSale}
            lines={[{merchandiseId: selectedVariant?.id, quantity: qty}]}
            className="dsb-atc"
          >
            {selectedVariant?.availableForSale ? '🛒  Add to Cart' : 'Sold Out'}
          </AddToCartButton>

          <a href="#" className="dsb-buy-now">Buy Now — Ships in 1–2 Days</a>

          {/* Trust pills */}
          <div className="dsb-trust">
            <span>🔒 Secure checkout</span>
            <span>📦 Free shipping $50+</span>
            <span>↩️ 30-day returns</span>
          </div>

          {/* Quick features */}
          <ul className="dsb-quick-features">
            <li>✔ 200+ guided prompts across 10 life chapters</li>
            <li>✔ Premium hardcover · lay-flat binding</li>
            <li>✔ Acid-free, archival-quality pages</li>
            <li>✔ Gift-ready packaging included</li>
          </ul>
        </div>
      </section>

      {/* ── Feature Cards ── */}
      <section className="dsb-features">
        <h2>Why Families Love This Journal</h2>
        <div className="dsb-features-grid">
          {FEATURES.map((f) => (
            <div className="dsb-feature-card" key={f.title}>
              <span className="dsb-feature-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── What's Inside Banner ── */}
      <section className="dsb-inside">
        <div className="dsb-inside-text">
          <h2>Ten Chapters. A Whole Lifetime.</h2>
          <p>
            Carefully structured prompts guide Dad through every era of his life —
            from his earliest memories to the wisdom he wants to pass on to you.
          </p>
          <ol className="dsb-chapters">
            <li>Early Childhood &amp; Family Roots</li>
            <li>School Days &amp; Friendships</li>
            <li>First Jobs &amp; Big Dreams</li>
            <li>Love &amp; Marriage</li>
            <li>Becoming a Parent</li>
            <li>Career &amp; Life Lessons</li>
            <li>Adventures &amp; Travel</li>
            <li>Values &amp; Beliefs</li>
            <li>Favourite Memories with You</li>
            <li>Letters to the Future</li>
          </ol>
        </div>
        <div className="dsb-inside-visual">
          <div className="dsb-book-spine">
            <span>Family Heirloom Journal</span>
            <strong>Dad,<br/>I Want to Hear<br/>Your Story</strong>
            <span>A Father's Guided Journal</span>
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="dsb-reviews">
        <h2>What Families Are Saying</h2>
        <div className="dsb-reviews-grid">
          {REVIEWS.map((r) => (
            <div className="dsb-review-card" key={r.name}>
              <div className="dsb-review-stars">{'★'.repeat(r.stars)}</div>
              <p className="dsb-review-text">"{r.text}"</p>
              <p className="dsb-review-name">— {r.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Gift CTA Banner ── */}
      <section className="dsb-gift-banner">
        <div className="dsb-gift-inner">
          <h2>🎁 The Perfect Gift for Dad</h2>
          <p>Father's Day · Birthdays · Christmas · Just Because</p>
          <AddToCartButton
            disabled={!selectedVariant?.availableForSale}
            lines={[{merchandiseId: selectedVariant?.id, quantity: 1}]}
            className="dsb-atc dsb-atc-light"
          >
            Get the Book — Gift It Today
          </AddToCartButton>
        </div>
      </section>

      <Analytics.ProductView
        data={{
          products: [{
            id: product.id,
            title: product.title,
            price: selectedVariant?.price?.amount ?? '0',
            vendor: product.vendor,
            variantId: selectedVariant?.id ?? '',
            variantTitle: selectedVariant?.title ?? '',
            quantity: qty,
          }],
        }}
      />
    </div>
  );
}

const DAD_BOOK_QUERY = `#graphql
  query DadBookProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
      descriptionHtml
      options {
        name
        values
      }
      featuredImage {
        id
        url
        altText
        width
        height
      }
      images(first: 6) {
        nodes {
          id
          url
          altText
          width
          height
        }
      }
      variants(first: 20) {
        nodes {
          id
          title
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
        }
      }
    }
  }
`;
