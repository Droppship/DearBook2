import {execSync} from 'child_process';
import {cpSync, mkdirSync, writeFileSync, copyFileSync} from 'fs';

execSync('npx shopify hydrogen build', {stdio: 'inherit'});

mkdirSync('.vercel/output/static', {recursive: true});
mkdirSync('.vercel/output/functions/index.func', {recursive: true});

cpSync('dist/client', '.vercel/output/static', {recursive: true});
copyFileSync('dist/server/index.js', '.vercel/output/functions/index.func/server.mjs');

writeFileSync(
  '.vercel/output/functions/index.func/index.mjs',
  `import server from './server.mjs';

export default async function handler(request, context) {
  const env = {
    SESSION_SECRET: process.env.SESSION_SECRET,
    PUBLIC_STORE_DOMAIN: process.env.PUBLIC_STORE_DOMAIN,
    PUBLIC_STOREFRONT_API_TOKEN: process.env.PUBLIC_STOREFRONT_API_TOKEN,
    PUBLIC_CHECKOUT_DOMAIN: process.env.PUBLIC_CHECKOUT_DOMAIN,
    PUBLIC_STOREFRONT_ID: process.env.PUBLIC_STOREFRONT_ID || '',
    PRIVATE_STOREFRONT_API_TOKEN: process.env.PRIVATE_STOREFRONT_API_TOKEN || '',
  };
  const executionContext = {
    waitUntil: context.waitUntil ? context.waitUntil.bind(context) : () => {},
  };
  return server.fetch(request, env, executionContext);
}
`,
);

writeFileSync(
  '.vercel/output/functions/index.func/.vc-config.json',
  JSON.stringify({runtime: 'edge', entrypoint: 'index.mjs'}),
);

writeFileSync(
  '.vercel/output/config.json',
  JSON.stringify({
    version: 3,
    routes: [{handle: 'filesystem'}, {src: '/(.*)', dest: '/'}],
  }),
);

console.log('Vercel Build Output created successfully.');
