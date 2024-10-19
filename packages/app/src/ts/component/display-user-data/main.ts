import {renderState} from 'alwatr/nanolib';
import {html} from 'lit';
import {customElement, state} from 'lit/decorators.js';

import {getUserDataJsonFSM} from './context.js';
import {BaseElement} from '../base-element.js';

import type {ServerRequestState} from 'alwatr/flux';

declare global {
  interface HTMLElementTagNameMap {
    'display-user-data': DisplayUserDataComponent;
  }
}

@customElement('display-user-data')
export class DisplayUserDataComponent extends BaseElement {
  @state()
  protected renderState_: ServerRequestState = 'initial';

  private userData__?: AcademyUserDataAfterSave;

  override connectedCallback(): void {
    super.connectedCallback();

    getUserDataJsonFSM.subscribe(({state}) => {
      this.userData__ = getUserDataJsonFSM.jsonResponse;
      this.renderState_ = state;
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
    if (this.userData__ === undefined) {
      return html`<p>داده ای برای نمایش وجود ندارد.</p>`;
    }

    return html`
      <section
        class="mt-2 data-table select-none transition-opacity aria-disabled:opacity-50 aria-disabled:pointer-events-none"
      >
        <table>
          <thead>
            <tr class="no-state">
              <th>تعداد افراد دعوت شده</th>
              <th>تعداد پیش ثبت نام ها</th>
              <th>تعداد ثبت نام ها</th>
              <th>درآمد شما</th>
            </tr>
          </thead>
          <tbody>
            <tr><span>${this.userData__.invitedCount} نفر</span></tr>
            <tr><span>${this.userData__.preRegisterCount} نفر</span></tr>
            <tr><span>${this.userData__.registeredCount} نفر</span></tr>
            <tr><span>${this.userData__.cash} تومان</span></tr>
          </tbody>
        </table>
      </section>
    `;
  }

  override render() {
    return html`<div class="border-b border-gray-900/10 pb-12">${
      renderState(this.renderState_, {
        _default: 'initial',
        initial: this.renderInitialStateTemplate_,
        loading: this.renderLoadingStateTemplate_,
        failed: this.renderFailedStateTemplate_,
        complete: this.renderCompleteStateTemplate_,
      }, this)
    }</div>`;
  }
}
