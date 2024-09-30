import {renderState} from '@alwatr/render-state';
import {provinceOptions, type AdminAgentFormData, type ProvinceItem} from '@alwatr/swiss-plus-support-common';
import {html, LitElement} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import {agentDataSaverJsonFSM} from './context.js';
import {logger} from '../../lib/config.js';
import '../maskable-input/national-code.js';
import '../maskable-input/phone.js';
import '../maskable-input/sheba.js';


declare global {
  interface HTMLElementTagNameMap {
    'admin-agent-form': AdminAgentFormComponent;
  }
}

@customElement('admin-agent-form')
export class AdminAgentFormComponent extends LitElement {
  @property() renderState: typeof agentDataSaverJsonFSM.state;

  @query('select[name="city"]')
  private citySelectElement_?: HTMLSelectElement;

  private formData_: AdminAgentFormData;

  constructor() {
    super();

    this.formData_ = {} as AdminAgentFormData;
    this.renderState = 'initial';
  }

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  override connectedCallback(): void {
    super.connectedCallback();

    agentDataSaverJsonFSM.subscribe(({state}) => {
      this.renderState = state;
    });
  }

  private onSubmit_() {
    this.formData_ = {
      firstName: this.renderRoot.querySelector<HTMLInputElement>('input[name="firstName"]')!.value,
      lastName: this.renderRoot.querySelector<HTMLInputElement>('input[name="lastName"]')!.value,
      phoneNumber: this.renderRoot.querySelector<HTMLInputElement>('phone-input')!.value,
      provinceId: this.renderRoot.querySelector<HTMLSelectElement>('select[name="province"]')!.value,
      cityId: this.renderRoot.querySelector<HTMLSelectElement>('select[name="province"]')!.value,
      shebaCode: this.renderRoot.querySelector<HTMLSelectElement>('sheba-input')!.value,
      nationalCode: this.renderRoot.querySelector<HTMLSelectElement>('national-code-input')!.value,
      id: 'new',
    };

    logger.logMethodArgs?.('onSubmit_', {formData: this.formData_});

    agentDataSaverJsonFSM.request({
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

      <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div class="">
          <label for="firstName" class="block text-sm font-medium leading-6 text-gray-900">نام</label>
          <div class="mt-2">
            <input
              type="text"
              name="firstName"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
               placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div class="">
          <label for="lastName" class="block text-sm font-medium leading-6 text-gray-900">نام خانوادگی</label>
          <div class="mt-2">
            <input
              type="text"
              name="lastName"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
               placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
          </div>
        </div>

        <div class="">
          <national-code-input></national-code-input>
        </div>

        <div class="">
          <phone-input></phone-input>
        </div>

        <div class="">
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

        <div class="">
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

        <div class="">
          <sheba-input label="شماره شبا"></sheba-input>
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
      renderState(agentDataSaverJsonFSM.state, {
        _default: 'initial',
        initial: this.renderInitialStateTemplate_,
        loading: this.renderLoadingStateTemplate_,
        failed: this.renderFailedStateTemplate_,
        complete: this.renderCompleteStateTemplate_,
      }, this)
    }</div>`;
  }
}
