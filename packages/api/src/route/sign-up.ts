import {config, logger} from '../lib/config.js';
import {cryptoFactory} from '../lib/crypto.js';
import {findInvitingUser} from '../lib/find-inviting-user.js';
import {alwatrNitrobase} from '../lib/nitrobase.js';
import {nanotronApiServer} from '../lib/server.js';
import {parseBodyAsJson} from '../pre-handler/parse-request-body.js';
import {sanitizeNumbers} from '../pre-handler/sanitize-numbers.js';

async function updateInvitingUserData(
  invitedUserId: string,
  invitationCode: number,
): Promise<void> {
  logger.logMethodArgs?.('updateInvitingUserData', {invitedUserId, invitationCode});

  const invitingUserData = await findInvitingUser(invitationCode);

  if (invitingUserData === undefined) return;

  // usersCollection.mergeItemData(invitingUserData.id, {
  //   cash: invitingUserData.cash + 100_000,
  //   invitedUserIds: invitingUserData.invitedUserIds.concat(invitedUserId),
  // });

  // usersCollection.save();
}

nanotronApiServer.defineRoute<{body: SignUpFormData}>({
  method: 'PUT',
  url: '/sign-up',
  preHandlers: [parseBodyAsJson, sanitizeNumbers],
  async handler() {
    logger.logMethodArgs?.('defineRoute(`/sign-in`)', {userData: this.sharedMeta.body});

    // add new user to the user's collection
    const userId = cryptoFactory.generateUserId();
    const invitationCode = 'test';

    alwatrNitrobase.newDocument<AcademyUser>(
      {
        ...config.nitrobase.userInfoDocument,
        ownerId: this.sharedMeta.body.cellPhoneNumber
      },
      {
        id: userId,
        cellPhoneNumber: this.sharedMeta.body.cellPhoneNumber,
        invitationCode,
        cash: 0,
        invitedUserIds: [],
        preRegisterUserIds: [],
        registeredUserIds: []
      }
    );

    await updateInvitingUserData(userId, +this.sharedMeta.body.invitationCode);

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
