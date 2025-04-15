// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  i18n: {
    locales: ['uz', 'ru'],
    defaultLocale: 'uz',
    localeDetection: false,
  },
  localePath: path.resolve('./src/locales'),
  // react: { useSuspense: false },
};
