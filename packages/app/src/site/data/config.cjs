const {env} = require('process');
const {execSync} = require('child_process');

function getLastCommitHash() {
  return execSync('git rev-parse --short HEAD').toString().trim();
}

module.exports = {
  siteUrl: env.siteUrl ?? '',

  siteName: 'Swiss Plus',

  theme: {
    light: '#b40e0b',
    dark: '#b40e0b',
    splashBackground: '#b40e0b', // used in manifest
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
