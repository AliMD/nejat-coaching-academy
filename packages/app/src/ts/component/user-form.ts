import {html} from 'lit';
import {customElement} from 'lit/decorators.js';

import {AbstractFormElement} from './abstract-form.js';
import {formDataSaverJsonFSM} from './context.js';
import {config, logger} from '../lib/config.js';
import {phoneCleaveOptions} from './input/main.js';

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
    const formData: UserFormData = {
      cellPhoneNumber: this.renderRoot.querySelector<HTMLInputElement>('text-input[name="cellPhoneNumber"]')!.value,
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
        label="شماره همراه"
        name="cellPhoneNumber"
        .cleaveOptions=${phoneCleaveOptions}
        class="aria-disabled:pointer-events-none aria-disabled:opacity-50"
        aria-disabled=${this.renderState_ === 'loading'}
      ></text-input>
    `;
  }
}
