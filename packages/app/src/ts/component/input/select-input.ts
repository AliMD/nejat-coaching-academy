import {html, LitElement} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import type {SelectOptionItem} from '@alwatr/swiss-plus-support-common';

declare global {
  interface HTMLElementTagNameMap {
    'select-input': SelectInputComponent;
  }
}

@customElement('select-input')
export class SelectInputComponent extends LitElement {
  @property() label: string;
  @property() name: string;
  @property({attribute: false}) options?: SelectOptionItem[];

  @property({type: String, attribute: 'dir'}) inputDir: 'ltr' | 'rtl';

  @query('select', true)
  private selectElement_?: HTMLInputElement;

  private value_: string;
  get value() {
    this.value_ = this.selectElement_!.value;
    return this.value_;
  }

  constructor() {
    super();

    this.value_ = '';
    this.name = 'selectInput';
    this.label = 'select input';
    this.inputDir = 'rtl';
    this.options = [];
  }

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  override render() {
    return html`
      <label
        for=${this.name}
        class="relative mt-4 block rounded ring-1 ring-outline bg-surface focus-within:border-primary
         focus-within:ring-2 focus-within:ring-primary transition-shadow duration-100"
      >
        <select
          name=${this.name}
          class="peer w-full text-right appearance-none outline-none
           cursor-pointer bg-transparent inline-block px-4 rounded-md shadow-sm h-10"
        >
          <option>انتخاب کنید</option>
          ${this.options!.map(item => html`<option value=${item.value}>${item.label}</option>`)}
        </select>
        <span
          class="pointer-events-none absolute block start-3 top-0 -translate-y-1/2 bg-inherit px-2 text-bodySmall
           text-onSurfaceVariant transition-all duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-bodyLarge
            peer-focus:top-0 peer-focus:text-bodySmall peer-focus:text-primary"
        >${this.label}</span>
      </label>
    `;
  }
}
