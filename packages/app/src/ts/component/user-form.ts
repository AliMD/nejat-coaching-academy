import {renderState} from '@alwatr/render-state';
import {dayOptions, monthOptions, provinceOptions, yearOptions} from '@alwatr/swiss-plus-support-common';
import {html, LitElement} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import {formDataSaverJsonFSM} from './context.js';
import './maskable-input/phone.js';
import './maskable-input/serial.js';
import {config, logger} from '../lib/config.js';

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
    const formData = {
      deviceSerial: this.renderRoot.querySelector<HTMLInputElement>('serial-input[name="invoiceSerial"]')!.value,
      firstName: this.renderRoot.querySelector<HTMLInputElement>('input[name="firstName"]')!.value,
      lastName: this.renderRoot.querySelector<HTMLInputElement>('input[name="lastName"]')!.value,
      phoneNumber: this.renderRoot.querySelector<HTMLInputElement>('phone-input')!.value,
      province: this.renderRoot.querySelector<HTMLSelectElement>('select[name="province"]')!.value,
      city: this.renderRoot.querySelector<HTMLSelectElement>('select[name="province"]')!.value,
      birthDate: {
        day: this.renderRoot.querySelector<HTMLSelectElement>('select[name="day"]')!.value,
        month: this.renderRoot.querySelector<HTMLSelectElement>('select[name="month"]')!.value,
        year: this.renderRoot.querySelector<HTMLSelectElement>('select[name="year"]')!.value,
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
      <h2 class="text-base font-semibold leading-7 text-gray-900">فرم کاربران</h2>

      <div class="mb-2">
        <serial-input label="سریال فاکتور" name="invoiceSerial"></serial-input>
      </div>

      <div class="mb-2">
        <label for="firstName" class="block text-sm font-medium leading-6 text-gray-900">نام</label>
        <div class="mt-2">
          <input
            type="text"
            name="firstName"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
              placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div class="mb-2">
        <label for="lastName" class="block text-sm font-medium leading-6 text-gray-900">نام خانوادگی</label>
        <div class="mt-2">
          <input
            type="text"
            name="lastName"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
              placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div class="mb-2">
        <phone-input></phone-input>
      </div>

      <div>
        <h4>تاریخ تولد</h4>
        <label for="day" class="block text-sm font-medium leading-6 text-gray-900">روز</label>
        <select
          name="day"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <option>انتخاب کنید</option>
          ${dayOptions.map((day) => html`<option value="${day}">${day}</option>`)}
        </select>

        <label for="month" class="block text-sm font-medium leading-6 text-gray-900">ماه</label>
        <select
          name="month"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <option>انتخاب کنید</option>
          ${monthOptions.map((monthItem) => html`<option value="${monthItem.value}">${monthItem.label}</option>`)}
        </select>

        <label for="year" class="block text-sm font-medium leading-6 text-gray-900">سال</label>
        <select
          name="year"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
            focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
        >
          <option>انتخاب کنید</option>
          ${yearOptions.map((year) => html`<option value="${year}">${year}</option>`)}
        </select>
      </div>

      <div class="mb-2">
        <label for="province" class="block text-sm font-medium leading-6 text-gray-900">استان</label>
        <div class="mt-2">
          <select
            @change=${
              (event: Event) => {
                this.onProvinceChange_(provinceOptions[((event.target as HTMLSelectElement).value)]);
              }}
            name="province"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
              focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option>انتخاب کنید</option>
            ${Object.values(provinceOptions).map((provinceItem) =>
                html`<option value="${provinceItem.id}">${provinceItem.label}</option>`)
              }
          </select>
        </div>
      </div>

      <div class="mb-2">
        <label for="city" class="block text-sm font-medium leading-6 text-gray-900">شهر</label>
        <div class="mt-2">
          <select
            name="city"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
              focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <option>انتخاب کنید</option>
          </select>
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
