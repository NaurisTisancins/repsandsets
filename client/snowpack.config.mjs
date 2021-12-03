/** @type {import("snowpack").SnowpackUserConfig } */
import proxy from 'http2-proxy';
export default {
  mount: {
    // directory name: 'build directory'
    public: '/',
    src: '/dist',
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-sass',
  ],
  routes: [
      {
        src: '/api/.*',
        dest: (req, res) => {
          // remove /api prefix (optional)
          // req.url = req.url.replace(/^\/api\//, '/');

          return proxy.web(req, res, {
            hostname: 'localhost',
            port: 5000,
          });
        },
      },
      /* Enable an SPA Fallback in development: */
      { "match": "routes", "src": ".*", "dest": "/index.html" },
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
  },
  buildOptions: {
    /* ... */
  },
};
