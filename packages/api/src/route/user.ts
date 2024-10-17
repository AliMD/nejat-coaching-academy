import {config, logger} from '../lib/config.js';
import {cryptoFactory} from '../lib/crypto.js';
import {alwatrNitrobase} from '../lib/nitrobase.js';
import {nanotronApiServer} from '../lib/server.js';
import {parseBodyAsJson} from '../pre-handler/parse-request-body.js';
import {sanitizeNumbers} from '../pre-handler/sanitize-numbers.js';

nanotronApiServer.defineRoute<{body: UserFormData}>({
  method: 'PUT',
  url: '/save-user',
  preHandlers: [parseBodyAsJson, sanitizeNumbers],
  async handler() {
    logger.logMethodArgs?.('defineRoute(`/save-user`)', {userData: this.sharedMeta.body});

    // add new user to the user's collection
    const usersCollection = await alwatrNitrobase.openCollection<DictionaryReq>(config.nitrobase.usersCollection);

    const userId = cryptoFactory.generateUserId();
    usersCollection.addItem(userId, this.sharedMeta.body);
    usersCollection.save();

    this.serverResponse.replyJson({
      ok: true,
      data: {
        id: userId,
      },
    });
  },
});
