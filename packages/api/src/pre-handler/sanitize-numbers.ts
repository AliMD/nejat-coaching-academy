import {UnicodeDigits} from 'alwatr/nanolib';

import {logger} from '../lib/config.js';

import type {NanotronClientRequest} from 'alwatr/nanotron';

const unicodeDigits = new UnicodeDigits('en');

export async function sanitizeNumbers(
  this: NanotronClientRequest<{body?: DictionaryOpt}>
): Promise<void> {
  logger.logMethodArgs?.('sanitizeNumbers', {body: this.sharedMeta.body});

  if (this.sharedMeta.body === undefined) {
    // FIXME:
    return;
  }

  for (const key of Object.keys(this.sharedMeta.body)) {
    this.sharedMeta.body[key] = unicodeDigits.translate(this.sharedMeta.body[key]);
  }
}
