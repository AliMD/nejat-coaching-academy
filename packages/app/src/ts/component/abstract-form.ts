import {renderState} from 'alwatr/nanolib';
import {html} from 'lit';
import {state} from 'lit/decorators.js';

import {BaseElement} from './base-element.js';
import './input/main.js';

import type {ServerRequestState} from 'alwatr/flux';

export abstract class AbstractFormElement extends BaseElement {
  @state()
  protected renderState_: ServerRequestState = 'initial';

  protected abstract onSubmit_(): void;

  protected abstract renderFormTemplate_(): unknown;

  protected renderInitialStateTemplate_() {
    return html`
      ${this.renderFormTemplate_()}

      <button
        class="flex items-center justify-center gap-2 h-10 px-6 rounded-3xl cursor-pointer select-none bg-primary
          state-onPrimary text-labelLarge elevation-0 hover:elevation-1 active:elevation-0
          aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50"
        aria-disabled=${this.renderState_ === 'loading'}
        @click=${this.onSubmit_}
      >
        <span>ثبت اطلاعات</span>
      </button>
    `;
  }

  protected renderLoadingStateTemplate_() {
    return html`
      ${this.renderFormTemplate_()}

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

  // TODO: handle errors
  protected renderFailedStateTemplate_() {
    return html`
      ${this.renderFormTemplate_()}

      <button
        class="flex items-center justify-center gap-2 h-10 px-6 rounded-3xl cursor-pointer select-none bg-tertiary
        state-onTertiary text-labelLarge elevation-0 hover:elevation-1 active:elevation-0
        aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:pointer-events-none disabled:opacity-50"
        aria-disabled=${this.renderState_ === 'loading'}
        @click=${this.onSubmit_}
      >
        <span>تلاش مجدد</span>
      </button>
    `;
  }

  protected renderCompleteStateTemplate_() {
    return html`
      <div class="bg-surfaceVariant text-primary p-8 text-bodyLarge flex flex-col items-center gap-5 rounded-3xl">
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
        <div>اطلاعات با موفقیت ثبت شد.</div>
      </div>
    `;
  }

  override render() {
    return renderState(
      this.renderState_,
      {
        _default: 'initial',
        initial: this.renderInitialStateTemplate_,
        loading: this.renderLoadingStateTemplate_,
        failed: this.renderFailedStateTemplate_,
        complete: this.renderCompleteStateTemplate_,
      },
      this,
    );
  }
}
