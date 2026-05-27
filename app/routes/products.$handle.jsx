import {useLoaderData} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import {Image, Money, VariantSelector, AddToCartButton} from '@shopify/hydrogen';
import {useState} from 'react';

export const meta = ({data}) => {
  return [{title: `DearBook2 | ${data?.product?.title ?? ''}`}];
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
  const {selectedOrFirstAvailableVariant} = product;
  const [selectedVariant, setSelectedVariant] = useState(
    selectedOrFirstAvailableVariant,
  );

  return (
    <div className="product">
      <div className="product-image">
        {selectedVariant?.image && (
          <Image
            data={selectedVariant.image}
            aspectRatio="1/1"
            sizes="(min-width: 45em) 50vw, 100vw"
          />
        )}
      </div>
      <div className="product-info">
        <h1>{product.title}</h1>
        <strong>
          <Money data={selectedVariant?.price} />
        </strong>
        <VariantSelector
          handle={product.handle}
          options={product.options}
          variants={product.variants.nodes}
        >
          {({option}) => (
            <div key={option.name} className="product-option">
              <h5>{option.name}</h5>
              <div className="product-option-values">
                {option.values.map(({value, isAvailable, isActive, to}) => (
                  <a
                    key={option.name + value}
                    href={to}
                    className={`product-option-value ${isActive ? 'active' : ''} ${!isAvailable ? 'disabled' : ''}`}
                  >
                    {value}
                  </a>
                ))}
              </div>
            </div>
          )}
        </VariantSelector>
        <AddToCartButton
          disabled={!selectedVariant?.availableForSale}
          lines={[
            {
              merchandiseId: selectedVariant?.id,
              quantity: 1,
            },
          ]}
        >
          {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
        </AddToCartButton>
        <div
          className="product-description"
          dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
        />
      </div>
    </div>
  );
}

const PRODUCT_QUERY = `#graphql
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      descriptionHtml
      options {
        name
        values
      }
      selectedOrFirstAvailableVariant(selectedOptions: []) {
        id
        availableForSale
        price {
          amount
          currencyCode
        }
        image {
          id
          url
          altText
          width
          height
        }
      }
      variants(first: 250) {
        nodes {
          id
          availableForSale
          price {
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
