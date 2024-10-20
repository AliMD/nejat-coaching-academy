import {config} from './config.js';
import {alwatrNitrobase} from './nitrobase.js';

export function initializeStore() {
  if (alwatrNitrobase.hasStore(config.nitrobase.authDocument) === false) {
    alwatrNitrobase.newCollection(config.nitrobase.authDocument);
  }

  if (alwatrNitrobase.hasStore(config.nitrobase.userInfoDocument) === false) {
    alwatrNitrobase.newCollection(config.nitrobase.userInfoDocument);
  }

  if (alwatrNitrobase.hasStore(config.nitrobase.phoneDocument) === false) {
    alwatrNitrobase.newCollection(config.nitrobase.phoneDocument);
  }

  if (alwatrNitrobase.hasStore(config.nitrobase.invitationCodeDocument) === false) {
    alwatrNitrobase.newCollection(config.nitrobase.invitationCodeDocument);
  }
}
