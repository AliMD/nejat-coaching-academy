import {renderState} from 'alwatr/nanolib';
import {html, LitElement} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import {formDataSaverJsonFSM} from './context.js';
import './file-uploader/main.js';
import {phoneCleaveOptions} from './input-mask-options/phone.js';
import './text-field.js';
import {config, logger} from '../lib/config.js';
import {nationalCodeCleaveOptions, serialCleaveOptions} from './input-mask-options/main.js';

import type {AgentFormData, ProvinceItem} from '@alwatr/swiss-plus-support-common';


declare global {
  interface HTMLElementTagNameMap {
    'agent-form': AgentFormComponent;
  }
}

@customElement('agent-form')
export class AgentFormComponent extends LitElement {
  @property() renderState: typeof formDataSaverJsonFSM.state;

  @query('select[name="city"]')
  private citySelectElement_?: HTMLSelectElement;

  private formData_: AgentFormData;

  constructor() {
    super();

    this.formData_ = {} as AgentFormData;
    this.renderState = 'initial';
  }

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
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
      nationalCode: this.renderRoot.querySelector<HTMLInputElement>('serial-input[name="nationalCode"]')!.value,
      deviceSerial: this.renderRoot.querySelector<HTMLInputElement>('serial-input[name="deviceSerial"]')!.value,
      invoiceSerial: this.renderRoot.querySelector<HTMLSelectElement>('serial-input[name="invoiceSerial"]')!.value,
    };

    logger.logMethodArgs?.('onSubmit_', {formData: this.formData_});

    formDataSaverJsonFSM.request({
      url: config.api.agent.save,
      bodyJson: this.formData_
    });
  }

  protected onProvinceChange_(selectedProvince?: ProvinceItem) {
    const citySelectElement = this.citySelectElement_;
    citySelectElement!.replaceChildren(); // Remove previous option(s)

    if (selectedProvince === undefined) {
      return;
    }

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
          dir="ltr"
          label="شماره همراه"
          name="cellPhoneNumber"
          .cleaveOptions=${phoneCleaveOptions}
        ></text-input>

        <text-input
          dir="ltr"
          label="کد ملی"
          name="nationalCode"
          .cleaveOptions=${nationalCodeCleaveOptions}
        ></text-input>

        <text-input
          dir="ltr"
          label="سریال فاکتور"
          name="invoiceSerial"
          .cleaveOptions=${serialCleaveOptions}
        ></text-input>

        <text-input
          dir="ltr"
          label="سریال دستگاه"
          name="deviceSerial"
          .cleaveOptions=${serialCleaveOptions}
        ></text-input>

        <file-uploader @on-file-uploaded=${this.onFileUploaded_}></file-uploader>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button
          @click=${this.onSubmit_}
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >ارسال</button>
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
