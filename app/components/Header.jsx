import {Await, NavLink} from '@remix-run/react';
import {Suspense} from 'react';

export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
  const {shop, menu} = header;
  return (
    <header className="header">
      <NavLink prefetch="intent" to="/" end>
        <strong>{shop.name}</strong>
      </NavLink>
      <HeaderMenu menu={menu} viewport="desktop" primaryDomainUrl={shop.primaryDomain.url} publicStoreDomain={publicStoreDomain} />
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}

function HeaderMenu({menu, primaryDomainUrl, viewport, publicStoreDomain}) {
  const className = `header-menu-${viewport}`;

  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <nav className={className} role="navigation">
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        const url =
          item.url?.includes('myshopify.com') ||
          item.url?.includes(publicStoreDomain) ||
          item.url?.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={closeAside}
            prefetch="intent"
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({isLoggedIn, cart}) {
  return (
    <nav className="header-ctas" role="navigation">
      <Suspense fallback="Sign in">
        <Await resolve={isLoggedIn} errorElement="Sign in">
          {(loggedIn) => <NavLink prefetch="intent" to="/account">{loggedIn ? 'Account' : 'Sign in'}</NavLink>}
        </Await>
      </Suspense>
      <Suspense fallback={<CartBadge count={null} />}>
        <Await resolve={cart}>
          {(cart) => <CartBadge count={cart?.totalQuantity ?? 0} />}
        </Await>
      </Suspense>
    </nav>
  );
}

function CartBadge({count}) {
  return (
    <NavLink prefetch="intent" to="/cart">
      Cart {count === null ? <span>&nbsp;</span> : <span>{count}</span>}
    </NavLink>
  );
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: null,
      tags: [],
      title: 'Products',
      type: 'HTTP',
      url: '/products',
      items: [],
    },
  ],
};
