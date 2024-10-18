import {resolveUrl, createLogger, packageTracer, type FetchOptions} from 'alwatr/nanolib';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

export const logger = /* #__PURE__ */ createLogger(__package_name__)
logger.logFileModule?.('config');

let srvBaseUrl = '/';
__dev_mode__: srvBaseUrl = 'http://localhost:8000';

const apiBaseUrl = resolveUrl(srvBaseUrl, '/api/v1');
const nitrobase = resolveUrl(srvBaseUrl, '/api/s7');

export const config = {
  api: {
    base: apiBaseUrl,
    saveUser: resolveUrl(apiBaseUrl, '/save-user'),
  } as const,

  nitrobase: {
    base: nitrobase,
  },

  fetchOptions: {
    retry: 2,
    retryDelay: '1s',
    timeout: '8s',
    removeDuplicate: 'auto',
  } as Partial<FetchOptions>,
} as const;
