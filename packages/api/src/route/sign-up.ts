import {hashString, nitrobaseStats} from 'common';

import {logger} from '../lib/config.js';
import {cryptoFactory} from '../lib/crypto.js';
// import {findInvitingUser} from '../lib/find-inviting-user.js';
import {alwatrNitrobase} from '../lib/nitrobase.js';
import {nanotronApiServer} from '../lib/server.js';
import {parseBodyAsJson} from '../pre-handler/parse-request-body.js';
import {sanitizeNumbers} from '../pre-handler/sanitize-numbers.js';

// import type {CollectionReference} from 'alwatr/nitrobase';

// async function updateInvitingUserData(
//   invitedUserId: string,
//   invitationCode: number,
//   usersCollection: CollectionReference<AcademyUser>
// ): Promise<void> {
//   logger.logMethodArgs?.('updateInvitingUserData', {invitedUserId, invitationCode});

//   const invitingUserData = await findInvitingUser(invitationCode);

//   if (invitingUserData === undefined || invitingUserData.invitedUserIds.indexOf(invitedUserId) > -1) return;

//   usersCollection.mergeItemData(invitingUserData.id, {
//     cash: invitingUserData.cash + 100_000,
//     invitedUserIds: invitingUserData.invitedUserIds.concat(invitedUserId),
//   });

//   usersCollection.save();
// }

function normalizePhoneNumber(phoneNumber: string): number {
  return Number(phoneNumber);
}

nanotronApiServer.defineRoute<{body: SignUpFormData}>({
  method: 'PUT',
  url: '/sign-up',
  preHandlers: [parseBodyAsJson, sanitizeNumbers],
  async handler() {
    logger.logMethodArgs?.('defineRoute(`/sign-up`)', {signUpData: this.sharedMeta.body});

    // add new user to the user's collection
    const userId = cryptoFactory.generateUserId();
    const userToken = cryptoFactory.generateToken([userId]);
    const normalizedPhoneNumber = normalizePhoneNumber(this.sharedMeta.body.phoneNumber);
    const invitationCode = 12345;

    alwatrNitrobase.newDocument<PhoneNumberDocument>(
      {
        ...nitrobaseStats.phoneDocument,
        ownerId: hashString(normalizedPhoneNumber + '')
      },
      {
        phoneNumber: normalizedPhoneNumber,
      }
    );

    alwatrNitrobase.newDocument<InvitationCodeDocument>(
      {
        ...nitrobaseStats.invitationCodeDocument,
        ownerId: hashString(invitationCode + ''),
      },
      {
        invitationCode,
      }
    );

    alwatrNitrobase.newDocument<AuthDocument>(
      {
        ...nitrobaseStats.authDocument,
        ownerId: this.sharedMeta.body.password
      },
      {
        auth: this.sharedMeta.body.password
      }
    );

    alwatrNitrobase.newDocument<UserDocument>(
      {
        ...nitrobaseStats.userInfoDocument,
        ownerId: userToken
      },
      {
        id: userId,
        cash: 0,
        invitationCode,
        invitedUserCount: 0,
        phoneNumber: normalizedPhoneNumber,
      }
    );

    // await updateInvitingUserData(userId, this.sharedMeta.body.invitationCode, userInfoDoc);

    this.serverResponse.replyJson({
      ok: true,
      data: {
        userId,
        userToken
      } as AuthData,
    });
  },
});
