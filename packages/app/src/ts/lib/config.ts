import {resolveUrl, createLogger, packageTracer, type FetchOptions} from 'alwatr/nanolib';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

export const logger = /* #__PURE__ */ createLogger(__package_name__)
logger.logFileModule?.('config');

/**
 * Debug API.
 *
 * ```ts
 * localStorage.setItem('debugApi.v1', JSON.stringify({url: "http://localhost:8000/"}))
 * ```
 */

const srvBaseUrl = '/';
const apiBaseUrl = resolveUrl(srvBaseUrl, '/api/v1');
const nitrobase = resolveUrl(srvBaseUrl, '/api/s7');
const cdnBaseUrl = resolveUrl(srvBaseUrl, '/cdn');

export const config = {
  cdn: {
    base: cdnBaseUrl,
    uploadedImages: resolveUrl(cdnBaseUrl, '/image/uploaded'),
  },
  api: {
    base: apiBaseUrl,
    saveUser: resolveUrl(apiBaseUrl, '/save-user'),
    saveAgent: resolveUrl(apiBaseUrl, '/save-agent'),
    saveAdminAgent: resolveUrl(apiBaseUrl, '/admin-save-agent'),
    uploadImage: resolveUrl(apiBaseUrl, '/upload-image'),
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
