import {validateNationalCode} from 'common';
import {html} from 'lit';
import {customElement} from 'lit/decorators.js';

import {AbstractFormElement} from './abstract-form.js';
import {agentDataSaverJsonFSM} from './context.js';
import {logger} from '../lib/config.js';
import {nationalCodeCleaveOptions, phoneCleaveOptions, shebaCleaveOptions, type SelectProvinceCityInputComponent} from './input/main.js';

declare global {
  interface HTMLElementTagNameMap {
    'admin-agent-form': AdminAgentFormComponent;
  }
}

@customElement('admin-agent-form')
export class AdminAgentFormComponent extends AbstractFormElement {
  constructor() {
    super();

    agentDataSaverJsonFSM.subscribe(({state}) => {
      this.renderState_ = state;
    });
  }

  protected onSubmit_() {
    const nationalCode = this.renderRoot.querySelector<HTMLSelectElement>('text-input[name="nationalCode"]')!.value;
    if (validateNationalCode(nationalCode) === false) {
      alert('کد ملی نامعتبر است');
      return;
    }

    // FIXME: Validate `provinceId` & `cityId`

    const {cityId = '', provinceId = ''} =
      this.renderRoot.querySelector<SelectProvinceCityInputComponent>('select-province-city-input')!.value;

    const formData: AdminAgentFormData = {
      firstName: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="firstName"]')!.value,
      lastName: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="lastName"]')!.value,
      cellPhoneNumber: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="cellPhoneNumber"]')!.value,
      shebaCode: this.renderRoot.querySelector<HTMLSelectElement>('text-input[name="shebaCode"]')!.value,
      nationalCode,
      provinceId,
      cityId,
      id: 'new',
    };

    logger.logMethodArgs?.('onSubmit_', {formData: formData});

    agentDataSaverJsonFSM.request({
      bodyJson: formData,
    });
  }

  protected renderFormTemplate_() {
    return html`
      <div
        class="flex gap-3 first-of-type:aria-disabled:pointer-events-none aria-disabled:opacity-50"
        aria-disabled=${this.renderState_ === 'loading'}
      >
        <text-input class="basis-2/5" label="نام" name="firstName"></text-input>
        <text-input class="basis-3/5" label="نام خانوادگی" name="lastName"></text-input>
      </div>

      <text-input
        input-dir="ltr"
        label="شماره همراه"
        name="cellPhoneNumber"
        .cleaveOptions=${phoneCleaveOptions}
        class="aria-disabled:pointer-events-none aria-disabled:opacity-50"
        aria-disabled=${this.renderState_ === 'loading'}
      ></text-input>

      <text-input
        input-dir="ltr"
        label="کد ملی"
        name="nationalCode"
        .cleaveOptions=${nationalCodeCleaveOptions}
        class="aria-disabled:pointer-events-none aria-disabled:opacity-50"
        aria-disabled=${this.renderState_ === 'loading'}
      ></text-input>

      <select-province-city-input
        class="aria-disabled:pointer-events-none aria-disabled:opacity-50"
        aria-disabled=${this.renderState_ === 'loading'}
      ></select-province-city-input>

      <text-input
        input-dir="ltr"
        label="شماره شبا"
        name="shebaCode"
        .cleaveOptions=${shebaCleaveOptions}
        class="aria-disabled:pointer-events-none aria-disabled:opacity-50"
        aria-disabled=${this.renderState_ === 'loading'}
      ></text-input>
    `;
  }
}
