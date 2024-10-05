import {LitElement} from 'lit';

export class BaseElement extends LitElement {
  customClass = 'block';

  constructor() {
    super();
    this.className = `${this.customClass} ${this.className}`;
  }
}
