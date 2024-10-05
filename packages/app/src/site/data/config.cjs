const {env} = require('process');
const {execSync} = require('child_process');

function getLastCommitHash() {
  return execSync('git rev-parse --short HEAD').toString().trim();
}

module.exports = {
  siteUrl: env.siteUrl ?? '',

  siteName: 'Swiss Plus',

  theme: {
    light: '#9CF1EC',
    dark: '#80D5D0',
    splashBackground: '#80D5D0', // used in manifest
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
