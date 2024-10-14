import {html} from 'lit';
import {customElement} from 'lit/decorators.js';

import {AbstractFormElement} from './abstract-form.js';
import {formDataSaverJsonFSM} from './context.js';
import {config, logger} from '../lib/config.js';
import './input/main.js';
import {phoneCleaveOptions, deviceSerialCleaveOptions, type SelectProvinceCityInputComponent} from './input/main.js';

declare global {
  interface HTMLElementTagNameMap {
    'user-form': UserFormComponent;
  }
}

@customElement('user-form')
export class UserFormComponent extends AbstractFormElement {
  constructor() {
    super();

    formDataSaverJsonFSM.subscribe(({state}) => {
      this.renderState_ = state;
    });
  }

  protected onSubmit_() {
    const {cityId, provinceId} = this.renderRoot.querySelector<SelectProvinceCityInputComponent>('select-province-city-input')!.value;

    const formData = {
      cityId,
      provinceId,
      deviceSerial: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="deviceSerial"]')!.value,
      firstName: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="firstName"]')!.value,
      lastName: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="lastName"]')!.value,
      cellPhoneNumber: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="cellPhoneNumber"]')!.value,
      birthDate: this.renderRoot.querySelector<HTMLSelectElement>('date-input')!.value,
    };

    logger.logMethodArgs?.('onSubmit_', {formData});

    formDataSaverJsonFSM.request({
      url: config.api.saveUser,
      bodyJson: formData,
    });
  }

  protected renderFormTemplate_() {
    return html`
      <text-input
        input-dir="ltr"
        label="سریال دستگاه"
        name="deviceSerial"
        .cleaveOptions=${deviceSerialCleaveOptions}
        class="aria-disabled:pointer-events-none aria-disabled:opacity-50"
        aria-disabled=${this.renderState_ === 'loading'}
      ></text-input>

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

      <date-input
        label="تاریخ تولد"
        name="birthDate"
        class="aria-disabled:pointer-events-none aria-disabled:opacity-50"
        aria-disabled=${this.renderState_ === 'loading'}
      ></date-input>

      <select-province-city-input
        class="aria-disabled:pointer-events-none aria-disabled:opacity-50"
        aria-disabled=${this.renderState_ === 'loading'}
      ></select-province-city-input>
    `;
  }
}
