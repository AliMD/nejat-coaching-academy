import type {CleaveOptions} from 'cleave.js/options';

export const shebaCleaveOptions: CleaveOptions = {
  prefix: 'IR',
  delimiter: ' ',
  blocks: [2, 4, 4, 4, 4, 4, 4],
  uppercase: true,
  noImmediatePrefix: true,
  numericOnly: true,
};
