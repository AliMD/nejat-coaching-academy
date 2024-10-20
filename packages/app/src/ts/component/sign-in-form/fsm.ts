import {getStorePath} from '@alwatr/nitrobase-helper';
import {AlwatrFluxStateMachine} from 'alwatr/flux';
import {fetchJson, localJsonStorage} from 'alwatr/nanolib';
import {hashString, nitrobaseStats} from 'common';

import {config, logger} from '../../lib/config.js';

export type SingInFormMachineState =
  | 'initial'
  | 'loading'
  | 'sign_in'
  | 'sign_in_error'
  | 'invalid_invitation_code'
  | 'sign_up'
  | 'sign_up_error'
  | 'complete';

type Event =
  | 'request_check_phone'
  | 'request_auth'
  | 'request_invitation_code'
  | 'request_sign_up'
  | 'request_check_phone_failed'
  | 'request_check_phone_succeed'
  | 'request_auth_failed'
  | 'request_auth_succeed'
  | 'request_invitation_code_failed'
  | 'request_invitation_code_succeed'
  | 'request_sign_up_failed'
  | 'request_sign_up_succeed';

class SingInFormFiniteStateMachine extends AlwatrFluxStateMachine<SingInFormMachineState, Event> {
  constructor(override name_: string) {
    super({name: name_, initialState: 'initial'});

    this.stateRecord_ = {
      initial: {
        request_check_phone: 'loading',
        request_auth: 'loading',
        request_invitation_code: 'loading',
      },
      loading: {
        request_check_phone_failed: 'sign_up',
        request_check_phone_succeed: 'sign_in',
        request_auth_failed: 'sign_in_error',
        request_auth_succeed: 'complete',
        request_invitation_code_failed: 'invalid_invitation_code',
        request_sign_up_failed: 'sign_up_error',
        request_sign_up_succeed: 'complete',
      },
      sign_in: {
        request_auth: 'loading',
      },
      sign_up: {
        request_invitation_code: 'loading',
        request_sign_up: 'loading',
      },
    };
  }

  async onRequestCheckPhone(phoneNumber: string) {
    this.transition('request_check_phone');

    const fetchResult = await fetchJson({
      url: config.nitrobase.base + '/' + getStorePath(nitrobaseStats.phoneDocument),
      headers: {
        Auth: hashString(phoneNumber),
      },
    });

    logger.logMethodArgs?.('onRequestCheckPhone', {phoneNumber, fetchResult});

    if (fetchResult.ok === false && fetchResult.statusCode === 404) {
      this.transition('request_check_phone_failed');
      return;
    }

    if (fetchResult.ok === true && fetchResult.statusCode === 200) {
      this.transition('request_check_phone_succeed');
    }
  }

  async onRequestSignIn(phoneNumber: string, password: string) {
    this.transition('request_auth');

    const fetchResult = await fetchJson<AuthData>({
      method: 'GET',
      url: config.nitrobase.base + '/' + getStorePath(nitrobaseStats.authDocument),
      headers: {
        Auth: hashString(phoneNumber + ':' + password),
      },
    });

    logger.logMethodArgs?.('onRequestSignIn', {phoneNumber, password, fetchResult});

    if (fetchResult.ok === false && fetchResult.statusCode === 404) {
      this.transition('request_auth_failed');
      return;
    }

    if (fetchResult.ok === true && fetchResult.statusCode === 200) {
      localJsonStorage.setItem('userAuth', {userId: fetchResult.userId, userToken: fetchResult.userToken});
      this.transition('request_auth_succeed');
    }
  }

  async onRequestSignUp(phoneNumber: string, invitationCode: string, password: string) {
    this.transition('request_invitation_code');

    const fetchResult = await fetchJson({
      method: 'GET',
      url: config.nitrobase.base + '/' + getStorePath(nitrobaseStats.invitationCodeDocument),
      headers: {
        Auth: hashString(invitationCode),
      },
    });

    logger.logMethodArgs?.('onRequestSignUp', {phoneNumber, invitationCode, password, fetchResult});

    if (fetchResult.ok === false && fetchResult.statusCode === 404) {
      this.transition('request_invitation_code_failed');
      return;
    }

    if (fetchResult.ok === true && fetchResult.statusCode === 200) {
      this.requestApiToSignUp__(phoneNumber, invitationCode, password);
    }
  }

  private async requestApiToSignUp__(phoneNumber: string, invitationCode: string, password: string) {
    this.transition('request_sign_up');

    const fetchResult = await fetchJson<AuthData>({
      method: 'POST',
      url: config.api.signUp,
      bodyJson: {
        phoneNumber: phoneNumber,
        invitationCode: invitationCode,
        password: hashString(password),
      } as SignUpFormData,
    });

    logger.logMethodArgs?.('requestApiToSignUp__', {fetchResult});

    if (fetchResult.ok === false) {
      this.transition('request_sign_up_failed');
      return;
    }

    if (fetchResult.ok === true && fetchResult.statusCode === 200) {
      localJsonStorage.setItem('userAuth', {userId: fetchResult.userId, userToken: fetchResult.userToken});
      this.transition('request_sign_up_succeed');
    }
  }
}

export const singInFormMachine = new SingInFormFiniteStateMachine('Sign-in-form-machine');
