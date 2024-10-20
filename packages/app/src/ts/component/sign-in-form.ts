import {renderState} from 'alwatr/nanolib';
import {html, nothing, type PropertyValues} from 'lit';
import {customElement, state} from 'lit/decorators.js';

import {BaseElement} from './base-element.js';

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
  protected renderState_: 'initial' | 'sign_in' | 'sign_up' | 'complete' = 'initial';

  override render() {
    const content = renderState<unknown, typeof this.renderState_>(
      this.renderState_,
      {
        _default: 'initial',
        initial: () => nothing,
        sign_in: this.renderSignInState_,
        sign_up: this.renderSignUpState_,
        complete: this.renderCompleteState_,
      },
      this,
    );

    return html`
      <div class="sign-in-form" ?opened=${this.opened}>${content}</div>
      <div class="scrim backdrop-blur-sm" ?opened=${this.opened}></div>
    `;
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    // check if signed in, remove myself
    setTimeout(
      () => {
        this.renderState_ = 'sign_in';
        setTimeout(() => {
          this.opened = true;
        }, 500);
      },
      Math.random() * 5_000 + 3_000,
    );
  }

  protected renderSignInState_() {
    return html`
      <h2 class="text-titleLarge text-center">یه قدم تا شروع ماجراجویی!</h2>
      <p class="text-bodyLarge text-center">لطفا با شماره موبایلت وارد شو تا بتونی ادامه بدی! 🚀</p>

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
        @click=${this.signInHandler_}
        class="mx-6 px-3 py-2.5 rounded-full cursor-pointer select-none bg-primary
        state-onPrimary text-labelLarge elevation-0 hover:elevation-1 active:elevation-0
        aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50"
      >
        ورود / عضویت
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
        name="referralCode"
        autocomplete="off"
        placeholder="1 2 3 4 5 6"
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

  protected signInHandler_() {
    this.renderState_ = 'sign_up';
  }

  protected signUpHandler_() {
    this.renderState_ = 'complete';
    setTimeout(() => {
      this.opened = false;
    }, 2_000);
  }
}
