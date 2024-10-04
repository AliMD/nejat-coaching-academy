import 'cleave.js/src/addons/phone-type-formatter.ir.js';

import type {CleaveOptions} from 'cleave.js/options';

export const phoneCleaveOptions: CleaveOptions = {
  prefix: '09',
  phone: true,
  phoneRegionCode: 'IR',
};

export const shebaCleaveOptions: CleaveOptions = {
  prefix: 'IR',
  delimiter: ' ',
  blocks: [2, 4, 4, 4, 4, 4, 4],
  uppercase: true,
  noImmediatePrefix: true,
  numericOnly: true,
};

export const serialCleaveOptions: CleaveOptions = {
  prefix: 'SP',
  blocks: [2, 3, 3, 3],
  uppercase: true,
};

export const nationalCodeCleaveOptions: CleaveOptions = {
  numeral: true,
  numericOnly: true,
  numeralIntegerScale: 10,
  numeralThousandsGroupStyle: 'none',
};
