import {html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import {BaseElement} from '../base-element.js';

declare global {
  interface HTMLElementTagNameMap {
    'select-input': SelectInputComponent;
  }
}

@customElement('select-input')
export class SelectInputComponent extends BaseElement {
  @property() label: string;
  @property() name: string;
  @property({attribute: false}) options?: SelectOptionItem[];

  @property({type: String, attribute: 'dir'}) inputDir: 'ltr' | 'rtl';

  @query('select', true)
  private selectElement_?: HTMLInputElement;

  get value() {
    return this.selectElement_?.value;
  }

  constructor() {
    super();

    this.name = 'selectInput';
    this.label = 'select input';
    this.inputDir = 'rtl';
  }


  override render() {
    return html`
      <label
        for=${this.name}
        class="relative block rounded-lg ring-1 ring-outline bg-surface focus-within:border-primary
         focus-within:ring-2 focus-within:ring-primary transition-shadow duration-100"
      >
        <select
          name=${this.name}
          @change=${() => this.dispatchEvent(new CustomEvent('input-change'))}
          class="peer text-start appearance-none outline-none
           cursor-pointer bg-transparent block px-4 shadow-sm h-10"
        >
          ${this.options?.map(item => html`<option value=${item.value}>${item.label}</option>`)}
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
