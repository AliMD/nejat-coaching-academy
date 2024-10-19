const {env} = require('process');
const {execSync} = require('child_process');

function getLastCommitHash() {
  return execSync('git rev-parse --short HEAD').toString().trim();
}

module.exports = {
  siteUrl: env.siteUrl ?? '',

  siteName: 'Nejat Academy',

  theme: {
    light: '#004E1D',
    dark: '#52E576',
    splashBackground: '#F3FCEF', // used in manifest
  },
  orientation: 'portrait', // used in manifest
  defaultLocale: 'fa-IR', // used in manifest

  googleAnalyticsKey: '',

  currentChangeHash: getLastCommitHash(),

  twitter: {
    site: '@alidotmd',
    creator: '@alidotmd',
  },
};
