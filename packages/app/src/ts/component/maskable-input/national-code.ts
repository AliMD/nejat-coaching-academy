import {validateNationalCode} from '@alwatr/swiss-plus-support-common';
import Cleave from 'cleave.js';
import 'cleave.js/dist/addons/cleave-phone.ir';
import {html, LitElement, type PropertyValues} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

declare global {
  interface HTMLElementTagNameMap {
    'national-code-input': NationalCodeInputComponent;
  }
}

@customElement('national-code-input')
export class NationalCodeInputComponent extends LitElement {
  @property() label: string;
  @property() name: string;

  @query('input[type="text"]')
  private inputElement_?: HTMLInputElement;

  private cleaveInstance_?: Cleave;

  private value_: string;
  get value() {
    this.value_ = this.cleaveInstance_!.getRawValue();
    return this.value_;
  }

  constructor() {
    super();

    this.value_ = '';
    this.name = 'nationalCode';
    this.label = 'شماره ملی';
  }

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  private validate__() {
    if (validateNationalCode(this.value.trim()) === false) {
      alert('کد ملی نامعتبر است');
      requestAnimationFrame(() => {
        this.inputElement_!.focus();
      });
    }
  }

  override render() {
    return html`
      <label class="block mb-2 text-sm font-medium text-gray-90" for=${this.name}>${this.label}</label>
      <input
        @blur=${this.validate__}
        name=${this.name}
        type="text"
        dir="ltr"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
         placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
    `;
  }

  protected override firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    // TODO: Define necessary properties to set dynamically.
    this.cleaveInstance_ = new Cleave(this.inputElement_!, {
      numeral: true,
      numericOnly: true,
      numeralIntegerScale: 10,
      numeralThousandsGroupStyle: 'none',
    });
  }
}
