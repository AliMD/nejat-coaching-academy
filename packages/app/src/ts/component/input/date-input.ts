import {dayOptions, monthOptions, yearOptions} from '@alwatr/swiss-plus-support-common';
import {html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import './select-input.js';
import {BaseElement} from '../base-element.js';

declare global {
  interface HTMLElementTagNameMap {
    'date-input': DateInputComponent;
  }
}

@customElement('date-input')
export class DateInputComponent extends BaseElement {
  override customClass = 'flex justify-between gap-3';

  @property() label: string;
  @property() name: string;
  @property({type: String, attribute: 'input-dir'}) inputDir: 'ltr' | 'rtl';

  @query('select-input[name="day"]', true)
  private daySelectElement__?: HTMLSelectElement;

  @query('select-input[name="month"]', true)
  private monthSelectElement__?: HTMLSelectElement;

  @query('select-input[name="year"]', true)
  private yearSelectElement__?: HTMLSelectElement;

  private value_: string;
  get value() {
    const _day = this.daySelectElement__!.value;
    const _month = this.monthSelectElement__!.value;
    const _year = this.yearSelectElement__!.value;
    this.value_ = `${_day}/${_month}/${_year}`;
    return this.value_;
  }

  constructor() {
    super();

    this.value_ = '';
    this.name = 'dateInput';
    this.label = 'date input';
    this.inputDir = 'rtl';
  }


  override render() {
    return html`
      <select-input
        class="basis-3/12"
        name="day"
        label="روز"
        .options=${dayOptions.map((item) => ({value: item, label: item}))}
      ></select-input>
      <select-input
        class="basis-6/12"
        name="month"
        label="ماه"
        .options=${monthOptions}
      ></select-input>
      <select-input
        class="basis-3/12"
        name="year"
        label="سال"
        .options=${yearOptions.map((item) => ({value: item, label: item}))}
      ></select-input>
    `;
  }
}
