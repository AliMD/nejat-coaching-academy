import {localJsonStorage} from 'alwatr/nanolib';
import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';

import {AbstractFormElement} from './abstract-form.js';
import {formDataSaverJsonFSM} from './context.js';
import {config, logger} from '../lib/config.js';
import {phoneCleaveOptions} from './input/main.js';

declare global {
  interface HTMLElementTagNameMap {
    'sign-in-form': SignInFormComponent;
  }
}

@customElement('sign-in-form')
export class SignInFormComponent extends AbstractFormElement {
  @state()
  private getReferralCode__ = false;

  private registerUserData?: { referralCode?: string; cellPhoneNumber: string; };
  private userData__?: AcademyUserDataAfterSave;

  constructor() {
    super();

    this.registerUserData = {
      cellPhoneNumber: '',
      referralCode: ''
    };

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

  private onCellphoneSubmit__() {
    this.registerUserData!.cellPhoneNumber = this.renderRoot.querySelector<HTMLInputElement>(
      'text-input[name="cellPhoneNumber"]')!.value;

    this.getReferralCode__ = true;
  }

  protected onSubmit_() {
    this.registerUserData!.referralCode = this.renderRoot.querySelector<HTMLInputElement>(
      'text-input[name="referralCode"]')!.value;

    logger.logMethodArgs?.('onSubmit_', {registerUserData: this.registerUserData});

    formDataSaverJsonFSM.request({
      url: config.api.registerUser,
      bodyJson: this.registerUserData,
    });
  }

  protected override renderCompleteStateTemplate_() {
    return html`
      <div class="bg-surfaceVariant text-primary p-8 text-bodyLarge flex flex-col items-center gap-5 rounded-3xl">
        <div>اطلاعات با موفقیت ثبت شد.</div>
      </div>
      `;
  }

  protected renderReferralCodeTemplate_() {
    return html`
      <text-input
        input-dir="ltr"
        label="کد معرف"
        name="referralCode"
        class="w-32"
        aria-disabled=${this.renderState_ === 'loading'}
      ></text-input>
      <button
        @click=${this.onSubmit_}
        class="flex items-center justify-center gap-2 h-10 px-6 rounded-3xl cursor-pointer select-none bg-secondary
          state-onSecondary text-labelLarge elevation-0 hover:elevation-1 active:elevation-0
          aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50"
      >
        <span>دریافت هدیه</span>
      </button>
    `;
  }

  protected renderGetPhoneTemplate_() {
    return html`
      <div class="flex flex-col gap-4">
        <p class="text-bodySmall text-center text-onError-light">
          توجه داشته باشید در صورتیکه شماره همراه خود رو نادرست وارد کنید، هدیه ای به شما تعلق نخواهد گرفت.
        </p>
        <div class="flex gap-3 justify-center">
          <text-input
            input-dir="ltr"
            label="شماره همراه"
            name="cellPhoneNumber"
            .cleaveOptions=${phoneCleaveOptions}
            class="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            aria-disabled=${this.renderState_ === 'loading'}
          ></text-input>
          <button
            @click=${this.onCellphoneSubmit__}
            class="flex items-center justify-center gap-2 h-10 px-6 rounded-3xl cursor-pointer select-none bg-secondary
              state-onSecondary text-labelLarge elevation-0 hover:elevation-1 active:elevation-0
              aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50"
          >
            <span>ثبت</span>
          </button>
        </div>
      </div>
    `;
  }

  protected override renderFormTemplate_() {
    return this.getReferralCode__ === true
      ? this.renderReferralCodeTemplate_()
      : this.renderGetPhoneTemplate_();
  }

  protected override renderInitialStateTemplate_() {
    return this.renderFormTemplate_();
  }
}
