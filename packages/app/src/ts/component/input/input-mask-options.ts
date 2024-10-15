import 'cleave.js/src/addons/phone-type-formatter.ir.js';

import type {CleaveOptions} from 'cleave.js/options';

export const phoneCleaveOptions: CleaveOptions = {
  prefix: '09',
  phone: true,
  phoneRegionCode: 'IR',
  // noImmediatePrefix: true,
};

export const nationalCodeCleaveOptions: CleaveOptions = {
  numeral: true,
  numericOnly: true,
  numeralIntegerScale: 10,
  numeralDecimalScale: 0,
  numeralThousandsGroupStyle: 'none',
};

export const yearInDateInputCleaveOptions: CleaveOptions = {
  prefix: '13',
  blocks: [4],
  // noImmediatePrefix: true,
  numericOnly: true,
};
