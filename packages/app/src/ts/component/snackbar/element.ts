import {delay} from 'alwatr/nanolib';
import {html, nothing, type PropertyValues, type TemplateResult} from 'lit';
import {customElement, property} from 'lit/decorators.js';

import {snackbarActionButtonClickedSignal} from './signal.js';
import {logger} from '../../lib/config.js';
import {BaseElement} from '../base-element.js';

declare global {
  interface HTMLElementTagNameMap {
    'snack-bar': SnackbarComponent;
  }
}

@customElement('snack-bar')
export class SnackbarComponent extends BaseElement {
  @property({type: String}) content = '';
  @property({type: String, attribute: 'action-button-label'}) actionButtonLabel: string | null = null;
  @property({type: Boolean, attribute: 'add-close-button'}) addCloseButton = false;

  /**
  * For the open and close animation to wait for animation end.
  */
  private static openAndCloseAnimationDuration__ = 200 // ms

  protected override firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties);

    // wait for render complete, then open the snackbar to start the opening animation
    delay.untilNextAnimationFrame().then(() => {
      this.setAttribute('open', '');
    });
  }


  /**
   * Close element and remove it from the DOM.
   *
   * Wait for the closing animation to end before removing the element.
   */
  async close(): Promise<void> {
    logger.logMethod?.('close');

    this.removeAttribute('open');

    await delay.by(SnackbarComponent.openAndCloseAnimationDuration__);
    this.remove();
  }

  /**
   * Send signal when action button is clicked.
   */
  private actionButtonClickHandler__(): void {
    logger.logMethod?.('actionButtonClickHandler__');

    snackbarActionButtonClickedSignal.notify();
  }

  protected override render(): unknown {
    super.render();

    return html`
      <span>${this.content}</span>
      <div>${this.renderActionButton__()} ${this.renderCloseButton__()}</div>
    `;
  }

  private renderActionButton__(): TemplateResult | typeof nothing {
    if (this.actionButtonLabel == null) return nothing;
    logger.logMethodArgs?.('renderActionButton__', {actionLabel: this.actionButtonLabel});

    return html` <button class="action-button" @click=${this.actionButtonClickHandler__.bind(this)}>${this.actionButtonLabel}</button> `;
  }

  private renderCloseButton__(): TemplateResult | typeof nothing {
    if (this.addCloseButton === false) return nothing;
    logger.logMethod?.('renderCloseButton__');

    return html`
      <button class="close-button" @click=${this.close.bind(this)}>
        <span class="alwatr-icon-font">close</span>
      </button>
    `;
  }
}
