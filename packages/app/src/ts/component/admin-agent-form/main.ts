import {validateNationalCode, type AdminAgentFormData} from '@alwatr/swiss-plus-support-common';
import {renderState} from 'alwatr/nanolib';
import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {agentDataSaverJsonFSM} from './context.js';
import {logger} from '../../lib/config.js';
import {
  nationalCodeCleaveOptions,
  phoneCleaveOptions,
  shebaCleaveOptions,
  type SelectProvinceCityInputComponent
} from '../input/main.js';


declare global {
  interface HTMLElementTagNameMap {
    'admin-agent-form': AdminAgentFormComponent;
  }
}

@customElement('admin-agent-form')
export class AdminAgentFormComponent extends LitElement {
  @property() renderState: typeof agentDataSaverJsonFSM.state;

  private formData__: AdminAgentFormData;

  constructor() {
    super();

    this.formData__ = {} as AdminAgentFormData;
    this.renderState = 'initial';
  }

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  override connectedCallback(): void {
    super.connectedCallback();

    agentDataSaverJsonFSM.subscribe(({state}) => {
      this.renderState = state;
    });
  }

  private onSubmit_() {
    const nationalCode = this.renderRoot.querySelector<HTMLSelectElement>('text-input[name="nationalCode"]')!.value;
    if (validateNationalCode(nationalCode) === false) {
      alert('کد ملی نامعتبر است');
      return;
    }

    const {cityId, provinceId} = this.renderRoot.querySelector<SelectProvinceCityInputComponent>('select-province-city-input')!.value;

    this.formData__ = {
      firstName: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="firstName"]')!.value,
      lastName: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="lastName"]')!.value,
      cellPhoneNumber: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="cellPhoneNumber"]')!.value,
      shebaCode: this.renderRoot.querySelector<HTMLSelectElement>('text-input[name="shebaCode"]')!.value,
      nationalCode,
      provinceId,
      cityId,
      id: 'new',
    };

    logger.logMethodArgs?.('onSubmit_', {formData: this.formData__});

    agentDataSaverJsonFSM.request({
      bodyJson: this.formData__
    });
  }

  protected renderLoadingStateTemplate_() {
    return html`<p>Loading...</p>`;
  }

  protected renderCompleteStateTemplate_() {
    return html`<p>Submitted successfully...</p>`;
  }

  protected renderFailedStateTemplate_() {
    // TODO: handle errors
    return this.renderInitialStateTemplate_();
  }

  protected renderInitialStateTemplate_() {
    return html`
      <div class="">
        <text-input label="نام" name="firstName"></text-input>
        <text-input label="نام خانوادگی" name="lastName"></text-input>

        <text-input
          input-dir="ltr"
          label="کد ملی"
          name="nationalCode"
          .cleaveOptions=${nationalCodeCleaveOptions}
        ></text-input>

        <text-input
          input-dir="ltr"
          label="شماره همراه"
          name="cellPhoneNumber"
          .cleaveOptions=${phoneCleaveOptions}
        ></text-input>

        <select-province-city-input></select-province-city-input>

          <text-input
            input-dir="ltr"
            label="شماره شبا"
            name="shebaCode"
            .cleaveOptions=${shebaCleaveOptions}
          ></text-input>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button
          @click=${this.onSubmit_}
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >ارسال</button>
      </div>
    `;
  }

  override render() {
    return html`<div class="border-b border-gray-900/10 pb-12">${
      renderState(agentDataSaverJsonFSM.state, {
        _default: 'initial',
        initial: this.renderInitialStateTemplate_,
        loading: this.renderLoadingStateTemplate_,
        failed: this.renderFailedStateTemplate_,
        complete: this.renderCompleteStateTemplate_,
      }, this)
    }</div>`;
  }
}
