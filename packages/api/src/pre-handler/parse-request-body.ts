import {logger} from '../lib/config.js';

import type {NanotronClientRequest} from '@alwatr/nanotron';

export async function parseRequestBody<T extends DictionaryOpt = DictionaryOpt>(
  this: NanotronClientRequest<DictionaryOpt<T>>
): Promise<void> {
  try {
    const bodyBuffer = await this.getBodyRaw();
    const data = JSON.parse(bodyBuffer.toString()) as T;
    logger.logMethodArgs?.('parseRequestBody', {data});

    this.sharedMeta.requestBody = data;
  }
  catch (error) {
    logger.error?.('parseRequestBody', 'buffer_parsing_error', {error});
  }
}
