import {renderState} from 'alwatr/nanolib';
import {html, type PropertyValues, type TemplateResult} from 'lit';
import {customElement, state} from 'lit/decorators.js';

import {BaseElement} from '../base-element.js';
import {singInFormMachine, type SingInFormMachineState} from './fsm.js';

declare global {
  interface HTMLElementTagNameMap {
    'sign-in-form': SignInFormComponent;
  }
}

@customElement('sign-in-form')
export class SignInFormComponent extends BaseElement {
  @state()
  protected opened = false;

  @state()
  protected renderState_: SingInFormMachineState = 'initial';

  private formTemplate: unknown;

  private formData: SignUpFormData = {
    phoneNumber: '',
    invitationCode: '',
    password: '',
  };

  override connectedCallback(): void {
    super.connectedCallback();
    singInFormMachine.subscribe(({state}) => {
      this.renderState_ = state;

      if (state === 'sign_in_error') {
        alert('رمز عبور معتبر نیست.');
      }

      if (state === 'invalid_invitation_code') {
        alert('کد دعوت معتبر نیست.');
      }

      if (state === 'sign_up_error') {
        alert('خطا در ثبت داده ها');
      }

      if (state === 'complete') {
        setTimeout(() => {
          this.opened = false;
        }, 2_000);
      }
    });
  }

  override render(): TemplateResult {
    this.formTemplate = renderState<unknown, typeof this.renderState_>(
      this.renderState_,
      {
        _default: 'initial',
        initial: this.renderInitialState_,
        loading: this.renderLoadingState_,
        sign_in: this.renderSignInState_,
        sign_in_error: 'sign_in',
        sign_up: this.renderSignUpState_,
        sign_up_error: 'sign_up',
        invalid_invitation_code: 'sign_up',
        complete: this.renderCompleteState_,
      },
      this,
    );

    return html`
      <div class="sign-in-form" ?opened=${this.opened}>${this.formTemplate}</div>
      <div class="scrim backdrop-blur-sm" ?opened=${this.opened}></div>
    `;
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    // check if signed in, remove myself
    setTimeout(() => {
      this.opened = true;
    }, Math.random() * 5_000 + 3_000);
  }

  protected renderInitialState_() {
    return html`
      <h2 class="text-titleLarge text-center">یه قدم تا شروع ماجراجویی!</h2>
      <p class="text-bodyLarge text-center">لطفا با شماره موبایلت وارد شو تا بتونی ادامه بدی! 🚀</p>

      <input
        type="tel"
        dir="ltr"
        name="phoneNumber"
        autocomplete="off"
        value="+98 91"
        required
        class="block bg-surface bg-opacity-60 state-onSurface text-bodyLarge p-2.5 mx-6 my-1
          w-auto rounded-xl ring-1 ring-outline focus:outline-0 focus:ring-opacity-100"
      />

      <button
        @click=${this.checkPhoneHandler_}
        class="mx-6 px-3 py-2.5 rounded-full cursor-pointer select-none bg-primary
        state-onPrimary text-labelLarge elevation-0 hover:elevation-1 active:elevation-0
        aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50"
        aria-disabled=${this.renderState_ === 'loading'}
      >
        ورود / عضویت
      </button>
    `;
  }

  protected renderSignInState_() {
    return html`
      <h2 class="text-titleLarge text-center">یه رمز عبور برای خودت ثبت کن</h2>

      <input
        type="number"
        dir="ltr"
        name="password"
        autocomplete="off"
        placeholder="رمز عبور"
        required
        class="block bg-surface text-center bg-opacity-60 state-onSurface text-bodyLarge
        p-2.5 mx-6 my-1 w-auto rounded-xl ring-1 ring-outline focus:outline-0 focus:ring-opacity-100"
      />

      <button
        @click=${this.signInHandler_}
        class="mx-6 px-3 py-2.5 rounded-full cursor-pointer select-none bg-primary
        state-onPrimary text-labelLarge elevation-0 hover:elevation-1 active:elevation-0
        aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50"
      >
        ورود
      </button>
    `;
  }

  protected renderSignUpState_() {
    return html`
      <h2 class="text-titleLarge text-center">انگار یه چیزی کمه!</h2>
      <p class="text-bodyLarge text-center">
        برای عضویت و استفاده از همه امکانات مدرسه ما، به یه کد معرف نیاز داری. از دوستات که قبلا عضو شدن، کدشون رو بگیر و به جمع ما بپیوند!
        🎉
      </p>

      <input
        type="number"
        dir="ltr"
        name="invitationCode"
        autocomplete="off"
        placeholder="1 2 3 4 5 6"
        required
        class="block bg-surface text-center bg-opacity-60 state-onSurface text-bodyLarge
        p-2.5 mx-6 my-1 w-auto rounded-xl ring-1 ring-outline focus:outline-0 focus:ring-opacity-100"
      />

      <input
        type="number"
        dir="ltr"
        name="password"
        autocomplete="off"
        placeholder="رمز عبور"
        required
        class="block bg-surface text-center bg-opacity-60 state-onSurface text-bodyLarge
        p-2.5 mx-6 my-1 w-auto rounded-xl ring-1 ring-outline focus:outline-0 focus:ring-opacity-100"
      />

      <input
        type="number"
        dir="ltr"
        name="passwordConfirmation"
        autocomplete="off"
        placeholder="تکرار رمز عبور"
        required
        class="block bg-surface text-center bg-opacity-60 state-onSurface text-bodyLarge
        p-2.5 mx-6 my-1 w-auto rounded-xl ring-1 ring-outline focus:outline-0 focus:ring-opacity-100"
      />

      <button
        @click=${this.signUpHandler_}
        class="mx-6 px-3 py-2.5 rounded-full cursor-pointer select-none bg-primary
          state-onPrimary text-labelLarge elevation-0 hover:elevation-1 active:elevation-0
          aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50"
      >
        عضویت
      </button>
    `;
  }

  protected renderCompleteState_() {
    return html`
      <div class="bg-surfaceVariant text-primary p-6 text-bodyLarge flex flex-col items-center gap-5 rounded-3xl">
        <div class="w-12 h-12 rounded-full bg-primary p-2 flex items-center justify-center">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-secondaryContainer"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0
              011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Success</span>
        </div>
        <div>به جمع ما خوش آمدید.</div>
      </div>
    `;
  }

  protected renderLoadingState_() {
    return html`
      ${this.formTemplate}

      <div
        role="status"
        class="flex items-center justify-center gap-2 h-10 px-6 rounded-3xl pointer-events-none select-none
          bg-surfaceVariant text-onSurfaceVariant text-labelLarge"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 101"
          aria-hidden="true"
          class="size-6 text-surface text-opacity-20 fill-primary animate-spin"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766
            22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013
            91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50
            9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692
            89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698
            1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501
            6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402
            10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849
            25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676
            39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span>در حال ذخیره...</span>
      </div>
    `;
  }

  protected checkPhoneHandler_() {
    this.formData.phoneNumber = this.renderRoot.querySelector<HTMLInputElement>('[name="phoneNumber"]')!.value;
    singInFormMachine.onRequestCheckPhone(this.formData.phoneNumber);
  }

  protected signInHandler_() {
    this.formData.password = this.renderRoot.querySelector<HTMLInputElement>('[name="password"]')!.value;
    singInFormMachine.onRequestSignIn(this.formData.phoneNumber, this.formData.password);
  }

  protected signUpHandler_() {
    this.formData.password = this.renderRoot.querySelector<HTMLInputElement>('[name="password"]')!.value;
    this.formData.invitationCode = this.renderRoot.querySelector<HTMLInputElement>('[name="invitationCode"]')!.value;
    const passwordConfirmation = this.renderRoot.querySelector<HTMLInputElement>('[name="passwordConfirmation"]')!.value;

    if (this.formData.password !== passwordConfirmation) {
      alert('پسورد و تایید پسورد یکسان نیستند');
      return;
    }

    singInFormMachine.onRequestSignUp(this.formData.phoneNumber, this.formData.invitationCode, this.formData.password);
  }
}
