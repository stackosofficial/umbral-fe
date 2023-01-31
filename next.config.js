// const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
//   i18n,
  experimental: {
    outputStandalone: true,
  },
  webpack: function (config, options) {
    config.experiments = { asyncWebAssembly: true, syncWebAssembly: true };
    return config;
  },
};

module.exports = nextConfig;