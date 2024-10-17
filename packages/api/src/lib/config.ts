import {createLogger, packageTracer, type FetchOptions} from 'alwatr/nanolib';
import {Region, StoreFileType, type AlwatrNitrobaseConfig, type StoreFileStat} from 'alwatr/nitrobase';

import type {CryptoFactoryConfig, NanotronApiServerConfig} from 'alwatr/nanotron';

__dev_mode__: packageTracer.add(__package_name__, __package_version__);

export const logger = /* #__PURE__ */ createLogger(__package_name__);

const env = /* #__PURE__ */ (() => {
  const devConfig = {
    dbPath: './db',
    tokenSecret: 'DEV_SECRET',
    uploadPath: './upload/',
  } as const;

  const env_ = {
    ...process.env,
    ...(__dev_mode__ ? devConfig : {}),
  };

  for (const key in devConfig) {
    if (!Object.hasOwn(devConfig, key)) continue;
    if (!Object.hasOwn(env_, key)) throw new Error(`${key} required in production.`);
  }

  return env_;
})();

export const config = {
  token: {
    secret: env.tokenSecret!,
    duration: '1y',
  } as CryptoFactoryConfig,

  upload: {
    basePath: env.uploadPath!,
    // TODO: fileSizeLimit: 0,
  },

  nanotronApiServer: {
    host: process.env.host ?? '0.0.0.0',
    port: process.env.port !== undefined ? +process.env.port : 8000,
    prefix: '/api/',
    // allowAllOrigin: true,
  } as NanotronApiServerConfig,

  nitrobase: {
    config: {
      rootPath: env.dbPath!,
    } as AlwatrNitrobaseConfig,

    usersCollection: {
      name: 'user-info',
      region: Region.PerUser,
      type: StoreFileType.Collection,
    } as StoreFileStat,

    agentsCollection: {
      name: 'agent-info',
      region: Region.PerUser,
      type: StoreFileType.Collection,
    } as StoreFileStat,

    fileMetaCollection: {
      name: 'file-meta',
      region: Region.Secret,
      type: StoreFileType.Collection,
    } as StoreFileStat,
  } as const,

  fetchOptions: {
    retry: 2,
    timeout: '6s',
  } as Partial<FetchOptions>,
} as const;

__dev_mode__: logger.logProperty?.('config', config);
