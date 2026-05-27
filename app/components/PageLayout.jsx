import {Await} from '@remix-run/react';
import {Suspense} from 'react';
import {CartForm} from '@shopify/hydrogen';
import {Header} from './Header';
import {Footer} from './Footer';

export function PageLayout({header, footer, isLoggedIn, cart, children, publicStoreDomain}) {
  return (
    <>
      <CartForm>
        <Header
          header={header}
          cart={cart}
          isLoggedIn={isLoggedIn}
          publicStoreDomain={publicStoreDomain}
        />
        <main>{children}</main>
        <Suspense>
          <Await resolve={footer}>
            {(data) => <Footer menu={data?.menu} shop={header?.shop} />}
          </Await>
        </Suspense>
      </CartForm>
    </>
  );
}
