import {Await, NavLink} from '@remix-run/react';
import {Suspense} from 'react';

export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
  const {shop, menu} = header;
  return (
    <div className="header-sticky-wrap">
      <header className="header">
        <NavLink prefetch="intent" to="/" className="header-logo" end>
          <span className="header-logo-icon">📖</span>
          <span className="header-logo-text">DearBook</span>
        </NavLink>

        <HeaderMenu
          menu={menu}
          viewport="desktop"
          primaryDomainUrl={shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />

        <div className="header-ctas">
          <Suspense fallback={<CartBadge count={null} />}>
            <Await resolve={cart}>
              {(cartData) => <CartBadge count={cartData?.totalQuantity ?? 0} />}
            </Await>
          </Suspense>
        </div>
      </header>
    </div>
  );
}

function HeaderMenu({menu, primaryDomainUrl, viewport, publicStoreDomain}) {
  return (
    <nav className={`header-menu-${viewport}`} role="navigation">
      <NavLink className={({isActive}) => `header-menu-item${isActive ? ' active' : ''}`} end prefetch="intent" to="/">
        Accueil
      </NavLink>
      <span className="header-menu-item header-menu-item-disabled">Catalogue</span>
      <span className="header-menu-item header-menu-item-disabled">Contact</span>
    </nav>
  );
}

function CartBadge({count}) {
  return (
    <NavLink prefetch="intent" to="/cart" className="cart-btn">
      🛒
      {count !== null && count > 0 && (
        <span className="cart-count">{count}</span>
      )}
      Panier
    </NavLink>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: '1',
      resourceId: null,
      tags: [],
      title: 'Accueil',
      type: 'HTTP',
      url: '/',
      items: [],
    },
    {
      id: '2',
      resourceId: null,
      tags: [],
      title: 'Notre Livre',
      type: 'HTTP',
      url: '/collections/all',
      items: [],
    },
    {
      id: '3',
      resourceId: null,
      tags: [],
      title: 'Témoignages',
      type: 'HTTP',
      url: '/#testimonials',
      items: [],
    },
    {
      id: '4',
      resourceId: null,
      tags: [],
      title: 'FAQ',
      type: 'HTTP',
      url: '/#faq',
      items: [],
    },
  ],
};
