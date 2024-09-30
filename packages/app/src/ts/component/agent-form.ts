import {html, LitElement} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import {formDataSaverJsonFSM} from './context.js';
import './file-uploader/main.js';
import './maskable-input/national-code.js';
import './maskable-input/serial.js';
import './maskable-input/sheba.js';
import {config, logger} from '../lib/config.js';
import './maskable-input/phone.js';

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

  private renderMap_?: Record<typeof formDataSaverJsonFSM.state, typeof this.renderInitialStateTemplate_>;
  private formData_: AgentFormData;

  constructor() {
    super();

    this.formData_ = {} as AgentFormData;
    this.renderState = 'initial';
    this.renderMap_ = {
      initial: this.renderInitialStateTemplate_.bind(this),
      loading: this.renderLoadingStateTemplate_.bind(this),
      failed: this.renderFailedStateTemplate_.bind(this),
      complete: this.renderCompleteStateTemplate_.bind(this),
    }
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
      phoneNumber: this.renderRoot.querySelector<HTMLInputElement>('phone-input')!.value,
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

    for (const city of selectedProvince.cities) {
      const optionElement = document.createElement('option');
      optionElement.text = city.label;
      optionElement.setAttribute('value', city.id + '');
      citySelectElement!.appendChild(optionElement);
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
      <h2 class="text-base font-semibold leading-7 text-gray-900">فرم نماینده ها</h2>

        <div class="">
          <phone-input></phone-input>
        </div>

        <div class="">
          <national-code-input></national-code-input>
        </div>

        <div class="">
          <serial-input label="سریال فاکتور" name="invoiceSerial"></serial-input>
        </div>

        <div class="">
          <serial-input label="سریال دستگاه" name="deviceSerial"></serial-input>
        </div>

        <div class="">
          <file-uploader @on-file-uploaded=${this.onFileUploaded_}></file-uploader>
        </div>
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
    return html`<div class="border-b border-gray-900/10 pb-12">${this.renderMap_![this.renderState]()}</div>`;
  }
}
