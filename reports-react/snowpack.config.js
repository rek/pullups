/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/dist',
  },
  plugins: [
    ['@snowpack/plugin-typescript', {args: ''}],
    "@snowpack/plugin-react-refresh",
    "@snowpack/plugin-dotenv"
    // ['@snowpack/plugin-typescript', {args: '--project src/index.tsx --jsx react'}]
    /* ... */
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
    open: 'none'
  },
  buildOptions: {
    /* ... */
  },
};
