import {nitrobaseStats} from 'common';

import {alwatrNitrobase} from './nitrobase.js';

export function initializeStore() {
  if (alwatrNitrobase.hasStore(nitrobaseStats.authDocument) === false) {
    alwatrNitrobase.newCollection(nitrobaseStats.authDocument);
  }

  if (alwatrNitrobase.hasStore(nitrobaseStats.userInfoDocument) === false) {
    alwatrNitrobase.newCollection(nitrobaseStats.userInfoDocument);
  }

  if (alwatrNitrobase.hasStore(nitrobaseStats.phoneDocument) === false) {
    alwatrNitrobase.newCollection(nitrobaseStats.phoneDocument);
  }

  if (alwatrNitrobase.hasStore(nitrobaseStats.invitationCodeDocument) === false) {
    alwatrNitrobase.newCollection(nitrobaseStats.invitationCodeDocument);
  }
}
