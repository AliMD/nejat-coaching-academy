import {hashString, nitrobaseStats} from 'common';

import {logger} from '../lib/config.js';
import {cryptoFactory} from '../lib/crypto.js';
import {alwatrNitrobase} from '../lib/nitrobase.js';
import {nanotronApiServer} from '../lib/server.js';
import {parseBodyAsJson} from '../pre-handler/parse-request-body.js';
import {sanitizeNumbers} from '../pre-handler/sanitize-numbers.js';

// TODO: Complete the function.
function normalizePhoneNumber(phoneNumber: string): number {
  return Number(phoneNumber);
}

async function updateInvitingUserData(invitingUserId: string): Promise<void> {
  const invitingUserInfoDoc = await alwatrNitrobase.openDocument<UserDocument>({
    ...nitrobaseStats.userInfoDocument,
    ownerId: invitingUserId,
  });

  const invitingUserInfoData = invitingUserInfoDoc.getData();

  invitingUserInfoDoc.mergeData({
    cash: invitingUserInfoData.cash + 100_000,
    invitedUserCount: invitingUserInfoData.invitedUserCount + 1,
  });

  invitingUserInfoDoc.save();
}

nanotronApiServer.defineRoute<{body: SignUpFormData}>({
  method: 'PUT',
  url: '/sign-up',
  preHandlers: [parseBodyAsJson, sanitizeNumbers],
  async handler() {
    logger.logMethodArgs?.('defineRoute(`/sign-up`)', {signUpData: this.sharedMeta.body});

    const newUserId = cryptoFactory.generateUserId();
    const newUserToken = cryptoFactory.generateToken([newUserId]);
    const normalizedPhoneNumber = normalizePhoneNumber(this.sharedMeta.body.phoneNumber);

    const hashedInvitationCode = hashString(this.sharedMeta.body.invitationCode + '');
    const invitationCodeDoc = await alwatrNitrobase.openDocument<InvitationCodeDocument>({
      ...nitrobaseStats.invitationCodeDocument,
      ownerId: hashedInvitationCode
    });

    const invitingUserId = invitationCodeDoc.getData().invitingUserId;

    alwatrNitrobase.newDocument<PhoneNumberDocument>(
      {
        ...nitrobaseStats.phoneDocument,
        ownerId: hashString(normalizedPhoneNumber + '')
      },
      {
        phoneNumber: normalizedPhoneNumber,
      }
    );

    const newInvitationCode = 12345; // TODO: Generate a new code by a function.
    alwatrNitrobase.newDocument<InvitationCodeDocument>(
      {
        ...nitrobaseStats.invitationCodeDocument,
        ownerId: hashString(newInvitationCode + ''),
      },
      {
        invitingUserId: newUserId,
        invitationCode: newInvitationCode,
      }
    );

    alwatrNitrobase.newDocument<AuthDocument>(
      {
        ...nitrobaseStats.authDocument,
        ownerId: this.sharedMeta.body.password // It's hashed by `client`
      },
      {
        auth: this.sharedMeta.body.password
      }
    );

    alwatrNitrobase.newDocument<UserDocument>(
      {
        ...nitrobaseStats.userInfoDocument,
        ownerId: newUserToken
      },
      {
        id: newUserId,
        phoneNumber: normalizedPhoneNumber,
        invitationCode: newInvitationCode,
        cash: 0,
        invitedUserCount: 0,
        invitingUserIds: [
          invitingUserId
        ],
      }
    );

    await updateInvitingUserData(invitingUserId);

    this.serverResponse.replyJson({
      ok: true,
      data: {
        userId: newUserId,
        userToken: newUserToken
      } as AuthData,
    });
  },
});
