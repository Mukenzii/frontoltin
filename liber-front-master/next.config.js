/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires, import/extensions
const { i18n, localePath } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: true,
  disableStaticImages: true,
  compiler: {
    emotion: true,
    styledComponents: true,
  },
  swcMinify: true,
  images: {
    domains: ['localhost'],
  },
  i18n,
  localePath,
};

module.exports = nextConfig;
