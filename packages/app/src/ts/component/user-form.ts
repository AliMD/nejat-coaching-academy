import {dayOptions, monthOptions, yearOptions} from '@alwatr/swiss-plus-support-common';
import {renderState} from 'alwatr/nanolib';
import {html, LitElement} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import {formDataSaverJsonFSM} from './context.js';
import {config, logger} from '../lib/config.js';
import './input/main.js';
import {phoneCleaveOptions, serialCleaveOptions} from './input-mask-options/main.js';

import type {SelectProvinceCityInputComponent} from './input/main.js';
import type {ProvinceItem} from '@alwatr/swiss-plus-support-common';

declare global {
  interface HTMLElementTagNameMap {
    'user-form': UserFormComponent;
  }
}

@customElement('user-form')
export class UserFormComponent extends LitElement {
  @property() renderState: typeof formDataSaverJsonFSM.state;

  @query('select[name="city"]')
  private citySelectElement_?: HTMLSelectElement;

  constructor() {
    super();
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
    const {cityId, provinceId} = this.renderRoot.querySelector<SelectProvinceCityInputComponent>('select-province-city-input')!.value;

    const formData = {
      cityId,
      provinceId,
      firstName: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="firstName"]')!.value,
      lastName: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="lastName"]')!.value,
      cellPhoneNumber: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="cellPhoneNumber"]')!.value,
      invoiceSerial: this.renderRoot.querySelector<HTMLSelectElement>('text-input[name="invoiceSerial"]')!.value,
      birthDate: {
        day: this.renderRoot.querySelector<HTMLSelectElement>('select-input[name="day"]')!.value,
        month: this.renderRoot.querySelector<HTMLSelectElement>('select-input[name="month"]')!.value,
        year: this.renderRoot.querySelector<HTMLSelectElement>('select-input[name="year"]')!.value,
      },
    };

    logger.logMethodArgs?.('onSubmit_', {formData});

    formDataSaverJsonFSM.request({
      url: config.api.user.save,
      bodyJson: formData
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
      <text-input
        input-dir="ltr"
        label="سریال فاکتور"
        name="invoiceSerial"
        .cleaveOptions=${serialCleaveOptions}
      ></text-input>

      <text-input label="نام" name="firstName"></text-input>
      <text-input label="نام خانوادگی" name="lastName"></text-input>

      <text-input
          input-dir="ltr"
          label="شماره همراه"
          name="cellPhoneNumber"
          .cleaveOptions=${phoneCleaveOptions}
        ></text-input>

      <div>
        <h4>تاریخ تولد</h4>
        <select-input name="day" label="روز" .options=${dayOptions.map((item) => ({value: item, label: item}))}></select-input>
        <select-input name="month" label="ماه" .options=${monthOptions} ></select-input>
        <select-input name="year" label="سال" .options=${yearOptions.map((item) => ({value: item, label: item}))} ></select-input>
      </div>

      <select-province-city-input></select-province-city-input>

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
