import {renderState} from 'alwatr/nanolib';
import {html} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {BaseElement} from './base-element.js';
import {formDataSaverJsonFSM} from './context.js';
import './file-uploader/main.js';
import {nationalCodeCleaveOptions, phoneCleaveOptions, serialCleaveOptions} from './input/main.js';
import {config, logger} from '../lib/config.js';

import type {AgentFormData} from '@alwatr/swiss-plus-support-common';

declare global {
  interface HTMLElementTagNameMap {
    'agent-form': AgentFormComponent;
  }
}

@customElement('agent-form')
export class AgentFormComponent extends BaseElement {
  @property() renderState: typeof formDataSaverJsonFSM.state;

  private formData_: AgentFormData;

  constructor() {
    super();

    this.formData_ = {} as AgentFormData;
    this.renderState = 'initial';
  }

  override connectedCallback(): void {
    super.connectedCallback();

    formDataSaverJsonFSM.subscribe(({state}) => {
      this.renderState = state;
    });
  }

  private onSubmit_() {
    this.formData_ = {
      ...this.formData_,
      cellPhoneNumber: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="cellPhoneNumber"]')!.value,
      nationalCode: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="nationalCode"]')!.value,
      deviceSerial: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="deviceSerial"]')!.value,
      invoiceSerial: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="invoiceSerial"]')!.value,
    };

    logger.logMethodArgs?.('onSubmit_', {formData: this.formData_});

    formDataSaverJsonFSM.request({
      url: config.api.agent.save,
      bodyJson: this.formData_
    });
  }

  protected onFileUploaded_(event: CustomEvent<{fileId: number}>) {
    logger.logMethodArgs?.('onFileUploaded_', {eventDetail: event.detail});
    this.formData_.fileId = event.detail.fileId;
  }

  protected renderLoadingStateTemplate_() {
    return html`<p>Loading...</p>`;
  }

  protected renderCompleteStateTemplate_() {
    return html`<p>Submitted successfully...</p>`;
  }

  protected renderFailedStateTemplate_() {
    // TODO: handle errors
    return this.renderInitialStateTemplate_();
  }

  protected renderInitialStateTemplate_() {
    return html`
      <div>
        <text-input
          input-dir="ltr"
          label="شماره همراه"
          name="cellPhoneNumber"
          type="number"
          .cleaveOptions=${phoneCleaveOptions}
        ></text-input>

        <text-input
          input-dir="ltr"
          label="کد ملی"
          name="nationalCode"
          type="number"
          .cleaveOptions=${nationalCodeCleaveOptions}
        ></text-input>

        <text-input
          input-dir="ltr"
          label="سریال فاکتور"
          name="invoiceSerial"
          .cleaveOptions=${serialCleaveOptions}
        ></text-input>

        <text-input
          input-dir="ltr"
          label="سریال دستگاه"
          name="deviceSerial"
          .cleaveOptions=${serialCleaveOptions}
        ></text-input>

        <file-uploader class="block mt-4" @on-file-uploaded=${this.onFileUploaded_}></file-uploader>
      </div>

      <div class="mt-4">
        <button
          class="flex h-10 w-full mt-6 cursor-pointer select-none items-center justify-center rounded-xl bg-primary px-6 transition-opacity
           elevation-0 state-onPrimary hover:elevation-1 active:elevation-0 aria-disabled:pointer-events-none aria-disabled:opacity-40"
          aria-disabled=${this.renderState === 'loading'}
          @click=${this.onSubmit_}
        >
          <span class="px-2 text-labelLarge">ارسال</span>
        </button>
      </div>
    `;
  }

  override render() {
    return html`<div class="border-b border-gray-900/10 pb-12">${
      renderState(formDataSaverJsonFSM.state, {
        _default: 'initial',
        initial: this.renderInitialStateTemplate_,
        loading: this.renderLoadingStateTemplate_,
        failed: this.renderFailedStateTemplate_,
        complete: this.renderCompleteStateTemplate_,
      }, this)
    }</div>`;
  }
}
