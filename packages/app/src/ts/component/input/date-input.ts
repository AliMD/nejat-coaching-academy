import {dayOptions, monthOptions, yearOptions} from '@alwatr/swiss-plus-support-common';
import {html, LitElement} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import './select-input.js';

declare global {
  interface HTMLElementTagNameMap {
    'date-input': DateInputComponent;
  }
}

@customElement('date-input')
export class DateInputComponent extends LitElement {
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

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  override render() {
    return html`
      <div class="flex flex-col">
        <h4>${this.label}</h4>
        <div class="flex flex-row justify-between gap-x-2">
          <select-input name="day" label="روز" .options=${dayOptions.map((item) => ({value: item, label: item}))}></select-input>
          <select-input name="month" label="ماه" .options=${monthOptions} ></select-input>
          <select-input name="year" label="سال" .options=${yearOptions.map((item) => ({value: item, label: item}))} ></select-input>
        </div>
      </div>
    `;
  }
}
