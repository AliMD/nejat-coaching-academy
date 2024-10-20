import {localJsonStorage} from 'alwatr/nanolib';
import {html} from 'lit';
import {customElement} from 'lit/decorators.js';

import {AbstractFormElement} from './abstract-form.js';
import {formDataSaverJsonFSM} from './context.js';
import {config, logger} from '../lib/config.js';
import {phoneCleaveOptions} from './input/main.js';

declare global {
  interface HTMLElementTagNameMap {
    'user-form': UserFormComponent;
  }
}

@customElement('user-form')
export class UserFormComponent extends AbstractFormElement {
  private userData__?: AcademyUserDataAfterSave;

  constructor() {
    super();

    formDataSaverJsonFSM.subscribe(({state}) => {
      if (state === 'complete') {
        this.userData__ = formDataSaverJsonFSM.jsonResponse;

        if (this.userData__ === undefined) {
          // FIXME: Handle this situation.
          return;
        }

        localJsonStorage.setItem('userData', this.userData__);
      }

      this.renderState_ = state;
    });
  }

  protected onSubmit_() {
    const formData = {
      cellPhoneNumber: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="cellPhoneNumber"]')!.value,
    };

    logger.logMethodArgs?.('onSubmit_', {formData});

    formDataSaverJsonFSM.request({
      url: config.api.registerUser,
      bodyJson: formData,
    });
  }

  protected override renderCompleteStateTemplate_() {
    const referralCodeUrl = location.origin + `/referral?code=${this.userData__!.invitationCode}`;

    return html`
      <div class="bg-surfaceVariant text-primary p-8 text-bodyLarge flex flex-col items-center gap-5 rounded-3xl">
        <div>اطلاعات با موفقیت ثبت شد.</div>
        <copyable-input .defaultValue=${referralCodeUrl}></copyable-input>
      </div>
      `;
  }

  protected renderFormTemplate_() {
    return html`
      <text-input
        input-dir="ltr"
        label="شماره همراه"
        name="cellPhoneNumber"
        .cleaveOptions=${phoneCleaveOptions}
        class="aria-disabled:pointer-events-none aria-disabled:opacity-50"
        aria-disabled=${this.renderState_ === 'loading'}
      ></text-input>
    `;
  }
}
