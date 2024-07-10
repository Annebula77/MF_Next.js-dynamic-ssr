import NextFederationPlugin from '@module-federation/nextjs-mf';

// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    home: `home@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
    shop: `shop@http://localhost:3002/_next/static/${location}/remoteEntry.js`,
    checkout: `checkout@http://localhost:3000/_next/static/${location}/remoteEntry.js`,
    };
};

const webpackConfig = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'shop',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './shop': './pages/index.tsx',
          './title': './components/exposedTitle.tsx',
          './pdp': './pages/p/[...slug].tsx',
          './pages-map': './pages-map.ts',
        },
        remotes: remotes(options.isServer),
        shared: {},
        extraOptions: {
          exposePages: true,
        },
      }),
    );

    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,HEAD,OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Origin, X-Requested-With, Content-Type, Accept',
          },
        ],
      },
    ];
  },
};

export default webpackConfig;
