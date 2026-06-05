import {CartForm} from '@shopify/hydrogen';
import {json, redirect} from '@shopify/remix-oxygen';
import {useLoaderData, Link} from '@remix-run/react';
import {CART_QUERY_FRAGMENT} from '~/lib/fragments';

export async function loader({context}) {
  const cartId = context.session.get('cartId');
  if (!cartId) {
    return json({cart: null});
  }

  const {cart} = await context.storefront.query(CART_QUERY, {
    variables: {cartId, numCartLines: 100, country: 'CA', language: 'EN'},
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
      <div className="cart-empty-page">
        <div className="cart-empty-inner">
          <div className="cart-empty-icon">🛒</div>
          <h1 className="cart-empty-title">Your cart is empty</h1>
          <p className="cart-empty-sub">
            You haven't added any products to your cart yet.
          </p>
          <Link to="/collections/all" className="btn-primary">
            Discover our book →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">My Cart</h1>

        <div className="cart-layout">
          {/* Items */}
          <div className="cart-lines">
            {cart.lines.nodes.map((line) => (
              <div key={line.id} className="cart-line">
                {line.merchandise.image && (
                  <img
                    src={line.merchandise.image.url}
                    alt={line.merchandise.product.title}
                    className="cart-line-img"
                  />
                )}
                <div className="cart-line-details">
                  <p className="cart-line-product">{line.merchandise.product.title}</p>
                  {line.merchandise.title !== 'Default Title' && (
                    <p className="cart-line-variant">{line.merchandise.title}</p>
                  )}
                  <p className="cart-line-qty">Quantity: {line.quantity}</p>
                </div>
                <div className="cart-line-price">
                  {parseFloat(line.cost.totalAmount.amount).toFixed(2)} {line.cost.totalAmount.currencyCode}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="cart-summary">
            <h2 className="cart-summary-title">Order Summary</h2>

            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>{parseFloat(cart.cost.subtotalAmount?.amount ?? cart.cost.totalAmount.amount).toFixed(2)} {cart.cost.totalAmount.currencyCode}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span className="cart-shipping">Calculated at checkout</span>
            </div>

            <div className="cart-summary-divider" />

            <div className="cart-summary-total">
              <span>Total</span>
              <span>{parseFloat(cart.cost.totalAmount.amount).toFixed(2)} {cart.cost.totalAmount.currencyCode}</span>
            </div>

            <a href={cart.checkoutUrl} className="cart-checkout-btn">
              Proceed to Checkout →
            </a>

            <div className="cart-trust">
              <span>🔒 100% Secure Payment</span>
              <span>↩️ 30-Day Returns</span>
            </div>

            <Link to="/collections/all" className="cart-continue">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
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
