import {CartForm} from '@shopify/hydrogen';
import {json, redirect} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {CART_QUERY_FRAGMENT} from '~/lib/fragments';

export async function loader({context}) {
  const cartId = context.session.get('cartId');
  if (!cartId) {
    return json({cart: null});
  }

  const {cart} = await context.storefront.query(CART_QUERY, {
    variables: {cartId, numCartLines: 100, country: 'CA', language: 'FR'},
    cache: context.storefront.CacheNone(),
  });

  return json({cart});
}

export async function action({request, context}) {
  const {cart} = context;
  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  if (action === CartForm.ACTIONS.LinesAdd) {
    const result = await cart.addLines(inputs.lines);

    if (result?.cart?.id) {
      context.session.set('cartId', result.cart.id);
    }

    return redirect('/cart');
  }

  let result;
  switch (action) {
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    default:
      throw new Error(`Unknown cart action: ${action}`);
  }

  return json(result);
}

export default function CartRoute() {
  const {cart} = useLoaderData();

  if (!cart || cart.totalQuantity === 0) {
    return (
      <div className="cart-empty">
        <h1>Votre panier est vide</h1>
        <a href="/collections/all" className="btn-primary">
          Continuer mes achats
        </a>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Mon Panier</h1>
      <div className="cart-items">
        {cart.lines.nodes.map((line) => (
          <div key={line.id} className="cart-item">
            {line.merchandise.image && (
              <img
                src={line.merchandise.image.url}
                alt={line.merchandise.title}
                width={80}
                height={80}
              />
            )}
            <div className="cart-item-info">
              <p>{line.merchandise.product.title}</p>
              <p>{line.merchandise.title}</p>
              <p>Quantité : {line.quantity}</p>
            </div>
            <div className="cart-item-price">
              {line.cost.totalAmount.amount} {line.cost.totalAmount.currencyCode}
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <strong>
          Total : {cart.cost.totalAmount.amount} {cart.cost.totalAmount.currencyCode}
        </strong>
      </div>
      <a href={cart.checkoutUrl} className="btn-primary cart-checkout-btn">
        Passer à la caisse →
      </a>
    </div>
  );
}

const CART_QUERY = `#graphql
  query CartQuery(
    $cartId: ID!
    $numCartLines: Int = 100
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    cart(id: $cartId) {
      ...CartApiQuery
    }
  }
  ${CART_QUERY_FRAGMENT}
`;
