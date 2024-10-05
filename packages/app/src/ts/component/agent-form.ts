import {html} from 'lit';
import {customElement} from 'lit/decorators.js';

import {AbstractFormElement} from './abstract-form.js';
import {formDataSaverJsonFSM} from './context.js';
import './file-uploader.js';
import {nationalCodeCleaveOptions, phoneCleaveOptions, deviceSerialCleaveOptions, invoiceSerialCleaveOptions} from './input/main.js';
import {config, logger} from '../lib/config.js';

import type {AgentFormData} from '@alwatr/swiss-plus-support-common';

declare global {
  interface HTMLElementTagNameMap {
    'agent-form': AgentFormComponent;
  }
}

@customElement('agent-form')
export class AgentFormComponent extends AbstractFormElement {
  private formData_: AgentFormData = {} as AgentFormData;

  constructor() {
    super();

    formDataSaverJsonFSM.subscribe(({state}) => {
      this.renderState_ = state;
    });

    // this.renderState_ = 'complete';
  }

  protected onSubmit_() {
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
      bodyJson: this.formData_,
    });
  }

  protected onFileUploaded_(event: CustomEvent<{fileId: number}>) {
    logger.logMethodArgs?.('onFileUploaded_', {eventDetail: event.detail});
    this.formData_.fileId = event.detail.fileId;
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

      <text-input
        input-dir="ltr"
        label="کد ملی"
        name="nationalCode"
        .cleaveOptions=${nationalCodeCleaveOptions}
        class="aria-disabled:pointer-events-none aria-disabled:opacity-50"
        aria-disabled=${this.renderState_ === 'loading'}
      ></text-input>

      <text-input
        input-dir="ltr"
        label="سریال فاکتور"
        name="invoiceSerial"
        .cleaveOptions=${invoiceSerialCleaveOptions}
        class="aria-disabled:pointer-events-none aria-disabled:opacity-50"
        aria-disabled=${this.renderState_ === 'loading'}
      ></text-input>

      <text-input
        input-dir="ltr"
        label="سریال دستگاه"
        name="deviceSerial"
        .cleaveOptions=${deviceSerialCleaveOptions}
        class="aria-disabled:pointer-events-none aria-disabled:opacity-50"
        aria-disabled=${this.renderState_ === 'loading'}
      ></text-input>

      <file-uploader
        @on-file-uploaded=${this.onFileUploaded_}
        class="aria-disabled:pointer-events-none aria-disabled:opacity-50"
        aria-disabled=${this.renderState_ === 'loading'}
      ></file-uploader>
    `;
  }
}
