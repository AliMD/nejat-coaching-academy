import {localJsonStorage} from '@alwatr/local-storage';
import {createLogger} from '@alwatr/logger';
import {packageTracer} from '@alwatr/package-tracer';

import type {FetchOptions} from '@alwatr/flux';

export const logger = createLogger(__package_name__);

packageTracer.add(__package_name__, __package_version__);

/**
 * Debug API.
 *
 * ```ts
 * localStorage.setItem('debugApi.v1', JSON.stringify({url: "https://canary-order.soffit.co/"}))
 * ```
 */

const srvBaseUrl = localJsonStorage.getItem<{url: string}>('debugApi', {url: 'http://localhost:8000/'}, 1).url;
const apiBaseUrl = srvBaseUrl + 'api/v0/';

export const config = {
  api: {
    base: srvBaseUrl,
    user: {
      save: apiBaseUrl + 'user/save'
    },
    agent: {
      save: apiBaseUrl + 'agent/save'
    },
    file: {
      upload: apiBaseUrl + 'file/upload'
    }
    // cdn: apiBaseUrl + 'cdn',
  } as const,

  fetchOptions: {
    retry: 2,
    retryDelay: 2_000,
    removeDuplicate: 'auto',
  } as Partial<FetchOptions>,
} as const;
