import {html} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';

import {BaseElement} from '../base-element.js';
import './text-input.js';

declare global {
  interface HTMLElementTagNameMap {
    'copyable-input': CopyableInputComponent;
  }
}

@customElement('copyable-input')
export class CopyableInputComponent extends BaseElement {
  @property()
  defaultValue?: string;

  @query('text-input[name="invitationLink"]', true)
  private inputElement?: HTMLInputElement;

  @query('[id="default-icon"]', true)
  private defaultIconElement__?: HTMLSpanElement;

  @query('[id="success-icon"]', true)
  private successIconElement__?: HTMLSpanElement;

  @query('[id="default-tooltip-message"]', true)
  private defaultTooltipElement__?: HTMLSpanElement;

  @query('[id="success-tooltip-message"]', true)
  private successTooltipElement__?: HTMLSpanElement;

  get value() {
    return this.inputElement?.value ?? '';
  }

  private showSuccess__() {
    this.defaultIconElement__!.classList.add('hidden');
    this.successIconElement__!.classList.remove('hidden');
    this.defaultTooltipElement__!.classList.add('hidden');
    this.successTooltipElement__!.classList.remove('hidden');

    setTimeout(this.resetToDefault__, 2000);
    // tooltip.show();
  }

  private resetToDefault__() {
    this.defaultIconElement__!.classList.remove('hidden');
    this.successIconElement__!.classList.add('hidden');
    this.defaultTooltipElement__!.classList.remove('hidden');
    this.successTooltipElement__!.classList.add('hidden');
    // tooltip.hide();
  }

  private async onCopyText__() {
    if (Object.hasOwn(navigator, 'clipboard') === false) {
      this.inputElement!.select();
      document.execCommand('copy');

      this.showSuccess__();
      return;
    }

    try {
      await navigator.clipboard.writeText(this.inputElement!.value);
      this.showSuccess__();
    }
    catch (error) {
      console.error('Failed to copy text:', error);
    }
  }

  protected override render(): unknown {
    return html`
      <div class="w-full max-w-sm">
      <div class="mb-2 flex justify-between items-center">
        <label for="invitationLink" class="text-sm font-medium text-gray-900 dark:text-white">لینک دعوت شما</label>
      </div>
      <div class="flex items-center">
        <span class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm
         font-medium text-center text-gray-900 bg-gray-100 border border-gray-300
         rounded-s-lg dark:bg-gray-600 dark:text-white dark:border-gray-600"
         >لینک</span>
        <div class="relative w-full">
          <text-input
            name="invitationLink"
            aria-describedby="helper-text-explanation"
            class="bg-gray-50 border border-e-0 border-gray-300 text-gray-500 dark:text-gray-400
             text-sm border-s-0 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value=${this.defaultValue ?? ''}
            readonly
            disabled
          ></text-input>
        </div>
        <button
          @click=${this.onCopyText__}
          class="flex-shrink-0 z-10 inline-flex items-center py-3 px-4 text-sm font-medium text-center
           text-white bg-blue-700 rounded-e-lg hover:bg-blue-800 focus:ring-4 focus:outline-none
            focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 border
             border-blue-700 dark:border-blue-600 hover:border-blue-800 dark:hover:border-blue-700"
            type="button"
          >
          <span id="default-icon">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2
               2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0
                2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"
              />
            </svg>
          </span>
          <span id="success-icon" class="hidden items-center">
            <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
            </svg>
          </span>
        </button>
        <div
          id="tooltip-website-url"
          role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium
           text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
          >
          <span id="default-tooltip-message">کپی لینک</span>
          <span id="success-tooltip-message" class="hidden">کپی شد!</span>
          <div class="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
    </div>
    `
  }
}
