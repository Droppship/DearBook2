import {Await, NavLink, Link} from '@remix-run/react';
import {Suspense, useState, useEffect} from 'react';

export function Header({header, isLoggedIn, cart, publicStoreDomain}) {
  const {shop, menu} = header;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <AnnouncementBar />
      <div className={`header-sticky-wrap${scrolled ? ' header-scrolled' : ''}`}>
        <header className="header">
          <NavLink prefetch="intent" to="/" className="header-logo" end>
            <span className="header-logo-icon">📖</span>
            <span className="header-logo-text">DearBook</span>
          </NavLink>

          <nav className="header-menu-desktop" role="navigation">
            <NavLink className={({isActive}) => `header-menu-item${isActive ? ' active' : ''}`} end prefetch="intent" to="/">
              Home
            </NavLink>
            <NavLink className={({isActive}) => `header-menu-item${isActive ? ' active' : ''}`} prefetch="intent" to="/collections/all">
              Our Book
            </NavLink>
            <NavLink className={({isActive}) => `header-menu-item${isActive ? ' active' : ''}`} prefetch="intent" to="/pages/about">
              About
            </NavLink>
            <NavLink className={({isActive}) => `header-menu-item${isActive ? ' active' : ''}`} prefetch="intent" to="/pages/faq">
              FAQ
            </NavLink>
            <NavLink className={({isActive}) => `header-menu-item${isActive ? ' active' : ''}`} prefetch="intent" to="/pages/contact">
              Contact
            </NavLink>
          </nav>

          <div className="header-ctas">
            <Suspense fallback={<CartBadge count={null} />}>
              <Await resolve={cart}>
                {(cartData) => <CartBadge count={cartData?.totalQuantity ?? 0} />}
              </Await>
            </Suspense>
            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span className={`hamburger${mobileOpen ? ' open' : ''}`}>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </header>
      </div>

      {mobileOpen && (
        <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />
      )}
      <nav className={`mobile-drawer${mobileOpen ? ' open' : ''}`} role="navigation">
        <div className="mobile-drawer-header">
          <span className="header-logo-icon">📖</span>
          <span className="header-logo-text">DearBook</span>
          <button className="mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">✕</button>
        </div>
        <div className="mobile-drawer-links">
          <NavLink to="/" onClick={() => setMobileOpen(false)} end>Home</NavLink>
          <NavLink to="/collections/all" onClick={() => setMobileOpen(false)}>Our Book</NavLink>
          <NavLink to="/pages/about" onClick={() => setMobileOpen(false)}>About</NavLink>
          <NavLink to="/pages/faq" onClick={() => setMobileOpen(false)}>FAQ</NavLink>
          <NavLink to="/pages/contact" onClick={() => setMobileOpen(false)}>Contact</NavLink>
        </div>
        <div className="mobile-drawer-footer">
          <Suspense fallback={null}>
            <Await resolve={cart}>
              {(cartData) => (
                <NavLink to="/cart" className="mobile-drawer-cart" onClick={() => setMobileOpen(false)}>
                  🛒 Cart {cartData?.totalQuantity > 0 && `(${cartData.totalQuantity})`}
                </NavLink>
              )}
            </Await>
          </Suspense>
        </div>
      </nav>
    </>
  );
}

function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <strong>Father's Day Special</strong> — Free shipping on all orders + <strong>30% OFF</strong> with code <strong>DAD30</strong>
    </div>
  );
}

function CartBadge({count}) {
  return (
    <NavLink prefetch="intent" to="/cart" className="cart-btn">
      🛒
      {count !== null && count > 0 && (
        <span className="cart-count">{count}</span>
      )}
      Cart
    </NavLink>
  );
}
