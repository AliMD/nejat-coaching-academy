import {provinceOptions, type CityItem, type ProvinceItem} from '@alwatr/swiss-plus-support-common';
import {html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import {BaseElement} from '../base-element.js';


declare global {
  interface HTMLElementTagNameMap {
    'select-province-city-input': SelectProvinceCityInputComponent;
  }
}

@customElement('select-province-city-input')
export class SelectProvinceCityInputComponent extends BaseElement {
  @property({type: String, attribute: 'dir'}) inputDir: 'ltr' | 'rtl';
  @property({type: Array, state: true}) cities?: CityItem[];

  @query('select[name="province"]', true)
  private provinceSelectElement__?: HTMLInputElement;

  @query('select[name="city"]', true)
  private citySelectElement__?: HTMLInputElement;

  private value_: { cityId: string; provinceId: string };
  get value() {
    this.value_ = {
      provinceId: this.provinceSelectElement__!.value,
      cityId: this.citySelectElement__!.value,
    };

    return this.value_;
  }

  constructor() {
    super();

    this.value_ = {
      cityId: '',
      provinceId: ''
    };
    this.inputDir = 'rtl';
    this.cities = [];
  }

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  protected onProvinceChange_(selectedProvince?: ProvinceItem) {
    if (selectedProvince === undefined) {
      this.cities = [];
      return;
    }

    this.cities = selectedProvince.cities;
  }

  override render() {
    return html`
      <label
        for="province"
        class="relative mt-4 block rounded ring-1 ring-outline bg-surface focus-within:border-primary
         focus-within:ring-2 focus-within:ring-primary transition-shadow duration-100"
      >
        <select
          @change=${
            (event: Event) => {
              this.onProvinceChange_(provinceOptions[((event.target as HTMLSelectElement).value)]);
            }}
          name="province"
          class="peer w-full text-right appearance-none outline-none
           cursor-pointer bg-transparent inline-block px-4 rounded-md shadow-sm h-10"
        >
          ${Object.values(provinceOptions).map(item => html`<option value=${item.id}>${item.label}</option>`)}
        </select>
        <span
          class="pointer-events-none absolute block start-3 top-0 -translate-y-1/2 bg-inherit px-2 text-bodySmall
           text-onSurfaceVariant transition-all duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-bodyLarge
            peer-focus:top-0 peer-focus:text-bodySmall peer-focus:text-primary"
        >استان</span>
      </label>

      <label
        for="city"
        class="relative mt-4 block rounded ring-1 ring-outline bg-surface focus-within:border-primary
         focus-within:ring-2 focus-within:ring-primary transition-shadow duration-100"
      >
        <select
          name="city"
          class="peer w-full text-right appearance-none outline-none
           cursor-pointer bg-transparent inline-block px-4 rounded-md shadow-sm h-10"
        >
          ${this.cities!.map(item => html`<option value=${item.id}>${item.label}</option>`)}
        </select>
        <span
          class="pointer-events-none absolute block start-3 top-0 -translate-y-1/2 bg-inherit px-2 text-bodySmall
           text-onSurfaceVariant transition-all duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-bodyLarge
            peer-focus:top-0 peer-focus:text-bodySmall peer-focus:text-primary"
        >شهر</span>
      </label>
    `;
  }
}
