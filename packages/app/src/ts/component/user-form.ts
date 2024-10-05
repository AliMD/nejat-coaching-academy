import {renderState} from 'alwatr/nanolib';
import {html, LitElement} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {formDataSaverJsonFSM} from './context.js';
import {config, logger} from '../lib/config.js';
import './input/main.js';
import {phoneCleaveOptions, serialCleaveOptions, type SelectProvinceCityInputComponent} from './input/main.js';

declare global {
  interface HTMLElementTagNameMap {
    'user-form': UserFormComponent;
  }
}

@customElement('user-form')
export class UserFormComponent extends LitElement {
  @property() renderState: typeof formDataSaverJsonFSM.state;

  constructor() {
    super();
    this.renderState = 'initial';
  }

  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  override connectedCallback(): void {
    super.connectedCallback();

    formDataSaverJsonFSM.subscribe(({state}) => {
      this.renderState = state;
    });
  }

  private onSubmit_() {
    const {cityId, provinceId} = this.renderRoot.querySelector<SelectProvinceCityInputComponent>('select-province-city-input')!.value;

    const invoiceSerial = this.renderRoot.querySelector<HTMLInputElement>('text-input[name="invoiceSerial"]')!.value
      .substring(serialCleaveOptions.prefix?.length ?? 0); // e.g. Remove `SP` from `invoiceSerial`

    const formData = {
      cityId,
      provinceId,
      invoiceSerial,
      firstName: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="firstName"]')!.value,
      lastName: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="lastName"]')!.value,
      cellPhoneNumber: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="cellPhoneNumber"]')!.value,
      birthDate: this.renderRoot.querySelector<HTMLSelectElement>('date-input')!.value,
    };

    logger.logMethodArgs?.('onSubmit_', {formData});

    formDataSaverJsonFSM.request({
      url: config.api.user.save,
      bodyJson: formData
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
      <text-input
        input-dir="ltr"
        label="سریال فاکتور"
        name="invoiceSerial"
        .cleaveOptions=${serialCleaveOptions}
      ></text-input>

      <text-input label="نام" name="firstName"></text-input>
      <text-input label="نام خانوادگی" name="lastName"></text-input>

      <text-input
          input-dir="ltr"
          label="شماره همراه"
          name="cellPhoneNumber"
          .cleaveOptions=${phoneCleaveOptions}
        ></text-input>

      <date-input label="تاریخ تولد" name="birthDate"></date-input>

      <select-province-city-input></select-province-city-input>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button
          class="w-full text-onPrimary bg-primary py-2 rounded"
          aria-disabled=${this.renderState === 'loading'}
          @click=${this.onSubmit_}
        >
          <span>ارسال</span>
        </button>
      </div>
    `;
  }

  override render() {
    return renderState(formDataSaverJsonFSM.state, {
      _default: 'initial',
      initial: this.renderInitialStateTemplate_,
      loading: this.renderLoadingStateTemplate_,
      failed: this.renderFailedStateTemplate_,
      complete: this.renderCompleteStateTemplate_,
    }, this);
  }
}
