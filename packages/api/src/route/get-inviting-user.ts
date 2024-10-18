import { logger } from '../lib/config.js';
import { findInvitingUser } from '../lib/find-intviting-user.js';
import {nanotronApiServer} from '../lib/server.js';

nanotronApiServer.defineRoute({
  method: 'GET',
  url: '/get-inviting-user-data',
  async handler() {
    logger.logMethodArgs?.('defineRoute(`/get-inviting-user-data`)', {queryParams: this.queryParams});

    if (this.queryParams.referralCode === undefined) {
      this.serverResponse.replyErrorResponse({
        ok: false,
        errorCode: 'invalid_query_params',
        errorMessage: 'Invalid query params',
      });

      return;
    }

    const invitingUserData = await findInvitingUser(this.queryParams.referralCode);
    if (invitingUserData === undefined) {
      this.serverResponse.replyErrorResponse({
        ok: false,
        errorCode: 'invalid_referral_code',
        errorMessage: 'Invalid referral code',
      });

      return;
    }

    this.serverResponse.replyJson({
      ok: true,
      data: {
        id: invitingUserData.id,
        cellPhoneNumber: invitingUserData.cellPhoneNumber,
        referralCode: invitingUserData.referralCode,
        cash: invitingUserData.cash,
        invitedCount: invitingUserData.invitedUserIds.length,
        preRegisterCount: invitingUserData.preRegisterUserIds.length,
        registeredCount: invitingUserData.registeredUserIds.length,
      } as UserDataAfterSave
    });
  },
});
