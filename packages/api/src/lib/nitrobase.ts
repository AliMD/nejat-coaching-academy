import {AlwatrNitrobase} from 'alwatr/nitrobase';

import {config} from './config.js';

export const alwatrNitrobase = /* #__PURE__ */ new AlwatrNitrobase(config.nitrobase.config);
