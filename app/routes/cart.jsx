import {CartForm} from '@shopify/hydrogen';
import {json, redirect} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';

export async function loader({context, request}) {
  const cookieHeader = request.headers.get('Cookie') || '';
  const cartMatch = cookieHeader.match(/(?:^|;\s*)cart=([^;]+)/);
  const cartCookieId = cartMatch ? decodeURIComponent(cartMatch[1]) : null;
  console.log('[Cart Loader] cart cookie:', cartCookieId ? cartCookieId.slice(-12) : 'ABSENT');
  const cart = await context.cart.get();
  console.log('[Cart Loader] cart.totalQuantity:', cart?.totalQuantity);
  return json({cart, _debug: {hasCookie: !!cartCookieId, qty: cart?.totalQuantity ?? 0}});
}

export async function action({request, context}) {
  const {cart} = context;

  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  let result;
  let addError = null;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd: {
      const mid = inputs.lines?.[0]?.merchandiseId;
      console.log('[Cart] merchandiseId:', mid);
      result = await cart.addLines(inputs.lines);
      const errs = result?.errors || result?.userErrors;
      console.log('[Cart] qty:', result?.cart?.totalQuantity, 'errors:', JSON.stringify(errs));
      if (errs?.length) {
        addError = errs.map((e) => e.message || e.code || 'unknown').join(', ');
      } else if (!result?.cart) {
        addError = 'Panier null - token ou permission invalide';
      } else if (!result.cart.totalQuantity) {
        addError = `Panier vide - mid=${mid ? mid.slice(-10) : 'MANQUANT'}`;
      }
      break;
    }
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    default:
      throw new Error(`Unknown cart action: ${action}`);
  }

  const headers = result?.cart?.id
    ? cart.setCartId(result.cart.id)
    : new Headers();

  if (action === CartForm.ACTIONS.LinesAdd) {
    const params = addError ? `?err=${encodeURIComponent(addError)}` : '';
    return redirect(`/cart${params}`, {headers});
  }

  return json(result, {headers});
}

export default function CartRoute() {
  const {cart, _debug} = useLoaderData();
  const urlParams =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();
  const addError = urlParams.get('err');

  if (!cart || cart.totalQuantity === 0) {
    return (
      <div className="cart-empty">
        <h1>Votre panier est vide</h1>
        {addError && (
          <p style={{color: 'red', marginBottom: '1rem', fontSize: '0.85rem'}}>
            Erreur: {addError}
          </p>
        )}
        <p style={{fontSize: '0.7rem', color: '#888', marginBottom: '1rem'}}>
          debug: cookie={_debug?.hasCookie ? 'OUI' : 'NON'} qty={_debug?.qty}
        </p>
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
