import {useLoaderData, Link} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {Image, Money, Pagination, getPaginationVariables} from '@shopify/hydrogen';

export const meta = ({data}) => {
  return [{title: `DearBook | ${data?.collection?.title ?? 'Collection'}`}];
};

export async function loader({params, request, context}) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {pageBy: 8});

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {handle, ...paginationVariables},
    cache: storefront.CacheShort(),
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {status: 404});
  }

  return json({collection});
}

export default function Collection() {
  const {collection} = useLoaderData();

  return (
    <div className="collection">
      <h1>{collection.title}</h1>
      <p className="collection-description">{collection.description}</p>
      <Pagination connection={collection.products}>
        {({nodes, PreviousLink, NextLink}) => (
          <>
            <div className="pagination-links"><PreviousLink>← Précédent</PreviousLink></div>
            <div className="products-grid">
              {nodes.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.handle}`}
                  className="product-card"
                >
                  {product.featuredImage && (
                    <Image
                      data={product.featuredImage}
                      aspectRatio="2/3"
                      sizes="(min-width: 45em) 20vw, 50vw"
                    />
                  )}
                  <h4>{product.title}</h4>
                  <small>
                    <Money data={product.priceRange.minVariantPrice} />
                  </small>
                </Link>
              ))}
            </div>
            <div className="pagination-links"><NextLink>Suivant →</NextLink></div>
          </>
        )}
      </Pagination>
    </div>
  );
}

const COLLECTION_QUERY = `#graphql
  query Collection(
    $handle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
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
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
`;
