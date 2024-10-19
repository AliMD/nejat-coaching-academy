import {localJsonStorage} from 'alwatr/nanolib';
import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';

import {AbstractFormElement} from './abstract-form.js';
import {formDataSaverJsonFSM} from './context.js';
import {logger} from '../lib/config.js';
// import {phoneCleaveOptions} from './input/main.js';

declare global {
  interface HTMLElementTagNameMap {
    'sign-in-form': SignInFormComponent;
  }
}

@customElement('sign-in-form')
export class SignInFormComponent extends AbstractFormElement {
  override customClass = "hidden";

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

  override connectedCallback(): void {
    super.connectedCallback();
    setTimeout(() => {
      this.classList.remove('hidden');
      this.classList.add('block');
      document.documentElement.classList.add('overflow-hidden');
    }, 3000);
  }

  private onCellphoneSubmit__() {
    this.registerUserData!.cellPhoneNumber = this.renderRoot.querySelector<HTMLInputElement>(
      'input[name="cellPhoneNumber"]')!.value;

    this.getReferralCode__ = true;
  }

  protected onSubmit_() {
    this.registerUserData!.referralCode = this.renderRoot.querySelector<HTMLInputElement>(
      'input[name="referralCode"]')!.value;

    logger.logMethodArgs?.('onSubmit_', {registerUserData: this.registerUserData});

    setTimeout(() => {
      this.renderState_ = 'complete';
    }, 3000);

    // formDataSaverJsonFSM.request({
    //   url: config.api.registerUser,
    //   bodyJson: this.registerUserData,
    // });
  }

  private hideTheForm__() {
    setTimeout(() => {
      this.setAttribute('aria-hidden', 'true');
    }, 3000);
  }

  protected override renderCompleteStateTemplate_() {
    this.hideTheForm__();

    return html`
      <div class="bg-surfaceVariant text-onSurface p-8 text-bodyLarge flex flex-col items-center gap-5 rounded-3xl">
        <div>به جمع ما خوش آمدید.</div>
      </div>
    `;
  }

  protected renderReferralCodeTemplate_() {
    return html`
      <h2 class="text-titleLarge text-center">
        انگار یه چیزی کمه!
      </h2>
      <p class="text-bodyLarge text-center">
        برای عضویت و استفاده از همه امکانات مدرسه ما،
         به یه کد معرف نیاز داری. از دوستات که قبلا عضو شدن، کدشون رو بگیر و به جمع ما بپیوند! 🎉
      </p>

      <input
        type="number"
        dir="ltr"
        name="referralCode"
        autocomplete="off"
        placeholder="1 2 3 4 5 6"
        required
        class="block bg-surface text-center bg-opacity-60 state-onSurface text-bodyLarge
         p-2.5 mx-6 my-1 w-auto rounded-xl ring-1 ring-outline focus:outline-0 focus:ring-opacity-100"
      />

      <button
        @click=${this.onSubmit_}
        class="mx-6 px-3 py-2.5 rounded-full cursor-pointer select-none bg-primary
          state-onPrimary text-labelLarge elevation-0 hover:elevation-1 active:elevation-0
          aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50"
      >
        عضویت
      </button>
    `;
  }

  protected renderGetPhoneTemplate_() {
    return html`
      <h2 class="text-titleLarge text-center">
        یه قدم تا شروع ماجراجویی!
      </h2>
      <p class="text-bodyLarge text-center">
        لطفا با شماره موبایلت وارد شو تا بتونی ادامه بدی! 🚀
      </p>

      <input
        type="tel"
        dir="ltr"
        name="cellPhoneNumber"
        autocomplete="off"
        value="+98 91"
        required
        class="block bg-surface bg-opacity-60 state-onSurface text-bodyLarge p-2.5 mx-6 my-1
          w-auto rounded-xl ring-1 ring-outline focus:outline-0 focus:ring-opacity-100"
      />

      <button
        @click=${this.onCellphoneSubmit__}
        class="mx-6 px-3 py-2.5 rounded-full cursor-pointer select-none bg-primary
        state-onPrimary text-labelLarge elevation-0 hover:elevation-1 active:elevation-0
        aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50"
      >
        ورود / عضویت
      </button>
    `;
  }

  protected override renderFormTemplate_() {
    return this.getReferralCode__ === true
      ? this.renderReferralCodeTemplate_()
      : this.renderGetPhoneTemplate_();
  }

  protected override renderInitialStateTemplate_() {
    return html`
      <div class="fixed z-popover left-4 right-4 bottom-4 bg-surfaceVariant text-onSurface px-4 pt-6 pb-7 rounded-xl flex flex-col gap-4">
        ${this.renderFormTemplate_()}
      </div>
      <div class="scrim backdrop-blur-sm" opened></div>
    `;
  }
}
