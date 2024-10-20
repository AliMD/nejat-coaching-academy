import {config, logger} from '../lib/config.js';
import {cryptoFactory} from '../lib/crypto.js';
import {alwatrNitrobase} from '../lib/nitrobase.js';
import {nanotronApiServer} from '../lib/server.js';
import {parseBodyAsJson} from '../pre-handler/parse-request-body.js';
import {sanitizeNumbers} from '../pre-handler/sanitize-numbers.js';

nanotronApiServer.defineRoute<{body: SignInFormData}>({
  method: 'PUT',
  url: '/sign-in',
  preHandlers: [parseBodyAsJson, sanitizeNumbers],
  async handler() {
    logger.logMethodArgs?.('defineRoute(`/sign-in`)', {userData: this.sharedMeta.body});

    const usersCollection = await alwatrNitrobase.openCollection<AcademyUser>(config.nitrobase.userDocument);

    // add new user to the user's collection
    const userId = cryptoFactory.generateUserId();
    const invitationCode = 'test';
    usersCollection.addItem(userId, {
      id: userId,
      cellPhoneNumber: this.sharedMeta.body.cellPhoneNumber,
      invitationCode,
      cash: 0,
      invitedUserIds: [],
      preRegisterUserIds: [],
      registeredUserIds: []
    });

    usersCollection.save();

    this.serverResponse.replyJson({
      ok: true,
      data: {
        id: userId,
        cellPhoneNumber: this.sharedMeta.body.cellPhoneNumber,
        invitationCode,
        cash: 0,
        invitedCount: 0,
        preRegisterCount: 0,
        registeredCount: 0,
      } as AcademyUserDataAfterSave,
    });
  },
});
