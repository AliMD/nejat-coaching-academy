import {config, logger} from '../lib/config.js';
import {cryptoFactory} from '../lib/crypto.js';
import {nanotronApiServer} from '../lib/server.js';
import {alwatrStore} from '../lib/store.js';
import {parseRequestBody} from '../pre-handler/parse-request-body.js';

import type {UserFormData} from '@alwatr/weaver-common';

nanotronApiServer.defineRoute<{requestBody: UserFormData}>({
  method: 'PUT',
  url: '/user/save',
  preHandlers: [parseRequestBody],
  async handler() {
    logger.logMethodArgs?.('defineRoute(`/user/save`)', {userData: this.sharedMeta.requestBody});

    // add new user to the user's collection
    const usersCollection = await alwatrStore.openCollection<UserFormData>(config.stores.usersCollection);

    const userId = cryptoFactory.generateUserId();
    usersCollection.addItem(userId, this.sharedMeta.requestBody);
    usersCollection.save();

    this.serverResponse.replyJson({
      ok: true,
      data: {
        id: userId,
      },
    });
  },
});
