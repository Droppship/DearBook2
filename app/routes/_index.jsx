import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';

export const meta = () => {
  return [{title: 'DearBook2 | Home'}];
};

export async function loader({context}) {
  const {storefront} = context;

  const featuredProducts = storefront.query(FEATURED_PRODUCTS_QUERY, {
    variables: {count: 4},
    cache: storefront.CacheLong(),
  });

  return defer({featuredProducts});
}

export default function Homepage() {
  const {featuredProducts} = useLoaderData();

  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to DearBook2</h1>
        <p>Your curated bookstore, powered by Shopify</p>
        <Link to="/collections/all" className="button">
          Shop All Books
        </Link>
      </div>

      <section className="featured-products">
        <h2>Featured Books</h2>
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={featuredProducts}>
            {(data) => (
              <div className="products-grid">
                {data?.products?.nodes?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </Await>
        </Suspense>
      </section>
    </div>
  );
}

function ProductCard({product}) {
  const image = product.featuredImage;
  const price = product.priceRange.minVariantPrice;

  return (
    <Link to={`/products/${product.handle}`} className="product-card">
      {image && (
        <Image
          data={image}
          aspectRatio="2/3"
          sizes="(min-width: 45em) 20vw, 50vw"
        />
      )}
      <h4>{product.title}</h4>
      <small>
        <Money data={price} />
      </small>
    </Link>
  );
}

const FEATURED_PRODUCTS_QUERY = `#graphql
  query FeaturedProducts($count: Int) {
    products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        featuredImage {
          id
          url
          altText
          width
          height
        }
      }
    }
  }
`;
