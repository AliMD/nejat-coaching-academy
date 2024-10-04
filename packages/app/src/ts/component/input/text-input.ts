import Cleave from 'cleave.js';
import {html, LitElement, type PropertyValues} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import type {CleaveOptions} from 'cleave.js/options';

declare global {
  interface HTMLElementTagNameMap {
    'text-input': TextInputComponent;
  }
}

@customElement('text-input')
export class TextInputComponent extends LitElement {
  @property() label: string;
  @property() name: string;
  @property({attribute: false}) cleaveOptions?: CleaveOptions;

  @property({type: String, attribute: 'input-dir'}) inputDir: 'ltr' | 'rtl';

  @query('input[type="text"]', true)
  private inputElement_?: HTMLInputElement;

  private cleaveInstance_?: Cleave;

  private value_: string;
  get value() {
    if (this.cleaveInstance_ === undefined) {
      this.value_ = this.inputElement_!.value;
    }
    else {
      this.value_ = this.cleaveInstance_.getRawValue();
    }

    return this.value_;
  }

  constructor() {
    super();

    this.value_ = '';
    this.name = 'textField';
    this.label = 'text field';
    this.inputDir = 'rtl';
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
        <input
          type="text"
          dir=${this.inputDir}
          name=${this.name}
          placeholder=${this.label}
          class="peer border-none bg-transparent text-onSurface placeholder-transparent focus:border-0
           focus:outline-0 block w-full text-bodyLarge p-2"
        />
        <span
          class="pointer-events-none absolute block start-3 top-0 -translate-y-1/2 bg-inherit px-2 text-bodySmall
           text-onSurfaceVariant transition-all duration-150 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-bodyLarge
            peer-focus:top-0 peer-focus:text-bodySmall peer-focus:text-primary"
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
