import {config, logger} from '../lib/config.js';
import {cryptoFactory} from '../lib/crypto.js';
import {findInvitingUser} from '../lib/find-intviting-user.js';
import {alwatrNitrobase} from '../lib/nitrobase.js';
import {nanotronApiServer} from '../lib/server.js';
import {parseBodyAsJson} from '../pre-handler/parse-request-body.js';
import {sanitizeNumbers} from '../pre-handler/sanitize-numbers.js';

import type { CollectionReference } from 'alwatr/nitrobase';

async function updateInvitingUserData(
  invitedUserId: string,
  referralCode: string,
  usersCollection: CollectionReference<User>
): Promise<void> {
  logger.logMethodArgs?.('updateInvitingUserData', {invitedUserId, referralCode});

  const invitingUserData = await findInvitingUser(referralCode);

  if (invitingUserData !== undefined) {
    usersCollection.mergeItemData(invitingUserData.id, {
      cash: invitingUserData.cash + 100_000,
      invitedUserIds: invitingUserData.invitedUserIds.concat(invitedUserId),
    });

    usersCollection.save();
  }
}

nanotronApiServer.defineRoute<{body: UserFormData}>({
  method: 'PUT',
  url: '/save-user',
  preHandlers: [parseBodyAsJson, sanitizeNumbers],
  async handler() {
    logger.logMethodArgs?.('defineRoute(`/save-user`)', {userData: this.sharedMeta.body});

    const usersCollection = await alwatrNitrobase.openCollection<User>(config.nitrobase.usersCollection);

    // add new user to the user's collection
    const userId = cryptoFactory.generateUserId();
    const referralCode = cryptoFactory.generateToken([userId]);
    usersCollection.addItem(userId, {
      id: userId,
      cellPhoneNumber: this.sharedMeta.body.cellPhoneNumber,
      referralCode,
      cash: 0,
      invitedUserIds: [],
      preRegisterUserIds: [],
      registeredUserIds: []
    });

    usersCollection.save();

    if (this.sharedMeta.body.referralCode !== undefined) {
      updateInvitingUserData(userId, this.sharedMeta.body.referralCode, usersCollection);
    }

    this.serverResponse.replyJson({
      ok: true,
      data: {
        id: userId,
        cellPhoneNumber: this.sharedMeta.body.cellPhoneNumber,
        referralCode,
        cash: 0,
        invitedCount: 0,
        preRegisterCount: 0,
        registeredCount: 0,
      } as UserDataAfterSave,
    });
  },
});
