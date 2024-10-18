import {renderState} from 'alwatr/nanolib';
import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';

import {BaseElement} from '../base-element.js';
import '../user-form.js';
import {getInvitingUserDataJsonFSM} from './context.js';
import { getReferralCodeFromUrl } from './get-referral-code.js';

import type { ServerRequestState } from 'alwatr/flux';

declare global {
  interface HTMLElementTagNameMap {
    'invited-user-form': InvitedUserFormComponent;
  }
}

@customElement('invited-user-form')
export class InvitedUserFormComponent extends BaseElement {
  @state()
  protected renderState_: ServerRequestState = 'initial';

  private invitingUserData__?: User;

  constructor() {
    super();

    const referralCode = getReferralCodeFromUrl(location.href);

    if (referralCode !== null) {
      getInvitingUserDataJsonFSM.request({
        queryParams: { referralCode }
      });
    }

    getInvitingUserDataJsonFSM.subscribe(({state}) => {
      if (state === 'complete') {
        this.invitingUserData__ = getInvitingUserDataJsonFSM.jsonResponse;

        if (this.invitingUserData__ === undefined) {
          // FIXME: Handle this situation.
          return;
        }
      }

      this.renderState_ = state;
    });
  }

  protected renderLoadingStateTemplate_() {
    return html`<p>Loading...</p>`;
  }

  protected renderCompleteStateTemplate_() {
    return html`
      <p class="text-labelMedium">
        شما از طرف شماره ${this.invitingUserData__!.cellPhoneNumber} به آکادمی کوچینگ نجات دعوت شدید.
        برای ادامه مسیر با وارد کردن شماره خود با ما همراه باشید.
      </p>
      <user-form></user-form>
    `;
  }

  protected renderFailedStateTemplate_() {
    // TODO: handle errors
    return html`<p>خطا ...</p>`;
  }

  override render() {
    return html`<div class="border-b border-gray-900/10 pb-12">${
      renderState(this.renderState_, {
        _default: 'loading',
        initial: 'loading',
        loading: this.renderLoadingStateTemplate_,
        failed: this.renderFailedStateTemplate_,
        complete: this.renderCompleteStateTemplate_,
      }, this)
    }</div>`;
  }
}
