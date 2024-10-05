import {provinceOptions, type CityItem} from '@alwatr/swiss-plus-support-common';
import {html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import {BaseElement} from '../base-element.js';
import './select-input.js';

declare global {
  interface HTMLElementTagNameMap {
    'select-province-city-input': SelectProvinceCityInputComponent;
  }
}

@customElement('select-province-city-input')
export class SelectProvinceCityInputComponent extends BaseElement {
  @property({type: String, attribute: 'dir'}) inputDir: 'ltr' | 'rtl';
  @property({type: Array, state: true}) cities?: CityItem[];

  @query('select-input[name="province"]', true)
  private provinceSelectElement__?: HTMLInputElement;

  @query('select-input[name="city"]', true)
  private citySelectElement__?: HTMLInputElement;

  private value_: { cityId: string; provinceId: string };
  get value() {
    this.value_ = {
      provinceId: this.provinceSelectElement__!.value,
      cityId: this.citySelectElement__!.value,
    };

    return this.value_;
  }

  override customClass = 'flex gap-3';

  constructor() {
    super();

    this.value_ = {
      cityId: '',
      provinceId: ''
    };
    this.inputDir = 'rtl';
    this.cities = [];
  }

  protected onProvinceChange_() {
    this.cities = provinceOptions[this.provinceSelectElement__!.value].cities;
  }

  override render() {
    return html`
      <select-input
        class="basis-3/5"
        @input-change=${this.onProvinceChange_}
        name="province"
        label="استان"
        .options=${Object.values(provinceOptions).map(item => ({value: item.id, label: item.label}))}
      ></select-input>

      <select-input
        class="basis-2/5"
        name="province"
        label="شهر"
        .options=${this.cities!.map(item => ({value: item.id, label: item.label}))}
      ></select-input>
    `;
  }
}
