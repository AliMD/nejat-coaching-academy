import Cleave from 'cleave.js';
import {html, type PropertyValues} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import {BaseElement} from '../base-element.js';

import type {CleaveOptions} from 'cleave.js/options';

declare global {
  interface HTMLElementTagNameMap {
    'text-input': TextInputComponent;
  }
}

@customElement('text-input')
export class TextInputComponent extends BaseElement {
  @property() label: string;
  @property() name: string;
  @property({attribute: false}) cleaveOptions?: CleaveOptions;
  @property({type: String, attribute: 'input-dir'}) inputDir: 'ltr' | 'rtl';
  @property() type: 'text' | 'number';

  @query('input[type="text"]', true)
  private inputElement_?: HTMLInputElement;

  private cleaveInstance_?: Cleave;

  get value() {
    if (this.cleaveInstance_ === undefined) {
      return this.inputElement_!.value;
    }

    return this.cleaveInstance_.getRawValue();
  }

  constructor() {
    super();

    this.name = 'textField';
    this.label = 'text field';
    this.inputDir = 'rtl';
    this.type = 'text';
  }


  override render() {
    return html`
      <label
        for=${this.name}
        class="relative block rounded-lg ring-1 ring-outline bg-surface focus-within:border-primary
         focus-within:ring-2 focus-within:ring-primary transition-shadow duration-100"
      >
        <input
          type=${this.type}
          dir=${this.inputDir}
          name=${this.name}
          placeholder=${this.label}
          autocomplete="off"
          class="peer border-none bg-transparent text-onSurface placeholder-transparent focus:border-0
           focus:outline-0 block w-full text-bodyLarge p-2"
        />
        <span
          class="pointer-events-none absolute block start-3 top-0 -translate-y-1/2 bg-inherit px-2 text-bodySmall
            text-onSurfaceVariant transition-all duration-150 peer-placeholder-shown:top-1/2
            peer-placeholder-shown:text-bodyLarge peer-focus:top-0 peer-focus:text-bodySmall peer-focus:text-primary"
        >${this.label}</span>
      </label>
    `;
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    if (this.cleaveOptions !== undefined) {
      // TODO: Define necessary properties to set dynamically.
      this.cleaveInstance_ = new Cleave(this.inputElement_!, this.cleaveOptions);
    }
  }
}
