import {CartForm} from '@shopify/hydrogen';
import {json, redirect} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';

export async function loader({context}) {
  const cart = await context.cart.get();
  return json({cart});
}

export async function action({request, context}) {
  const {cart} = context;

  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  let result;
  let addError = null;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      console.log('[Cart] inputs.lines:', JSON.stringify(inputs.lines));
      result = await cart.addLines(inputs.lines);
      console.log('[Cart] totalQuantity:', result?.cart?.totalQuantity);
      console.log('[Cart] errors:', JSON.stringify(result?.errors));
      if (result?.errors?.length) {
        addError = result.errors.map((e) => e.message).join(', ');
      } else if (!result?.cart?.totalQuantity) {
        addError = 'Le produit na pas pu etre ajoute (quantite 0)';
      }
      break;
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
  const {cart} = useLoaderData();
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
