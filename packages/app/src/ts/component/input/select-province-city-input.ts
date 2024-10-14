import {provinceOptions} from 'common';
import {html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import {BaseElement} from '../base-element.js';
import {type SelectInputComponent} from './select-input.js';

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
  private provinceSelectElement__?: SelectInputComponent;

  @query('select-input[name="city"]', true)
  private citySelectElement__?: SelectInputComponent;

  get value() {
    return {
      provinceId: this.provinceSelectElement__?.value,
      cityId: this.citySelectElement__?.value,
    };
  }

  override customClass = 'flex gap-3';

  constructor() {
    super();
    this.inputDir = 'rtl';
    this.cities = provinceOptions[1].cities;
  }

  protected onProvinceChange_() {
    const provinceId = this.provinceSelectElement__?.value;
    if (provinceId === undefined) return;
    this.cities = provinceOptions[provinceId].cities;
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
        .options=${this.cities?.map(item => ({value: item.id, label: item.label}))}
      ></select-input>
    `;
  }
}
