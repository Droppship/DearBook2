import {createCookieSessionStorage} from '@shopify/remix-oxygen';

export class AppSession {
  #sessionStorage;
  #session;

  constructor(sessionStorage, session) {
    this.#sessionStorage = sessionStorage;
    this.#session = session;
  }

  static async init(request, secrets) {
    const storage = createCookieSessionStorage({
      cookie: {
        name: 'session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets,
      },
    });

    const session = await storage
      .getSession(request.headers.get('Cookie'))
      .catch(() => storage.getSession());

    return new AppSession(storage, session);
  }

  get has() {
    return this.#session.has.bind(this.#session);
  }

  get get() {
    return this.#session.get.bind(this.#session);
  }

  get set() {
    return this.#session.set.bind(this.#session);
  }

  get unset() {
    return this.#session.unset.bind(this.#session);
  }

  get isPending() {
    return Boolean(this.#session.data);
  }

  async commit() {
    return this.#sessionStorage.commitSession(this.#session);
  }

  async destroy() {
    return this.#sessionStorage.destroySession(this.#session);
  }
}
