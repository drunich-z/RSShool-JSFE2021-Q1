import { BaseComponent } from '../base-component';

export class RegButton extends BaseComponent {
  constructor(className: string [], innerText: string) {
    super('div', className);
    this.element.innerText = innerText;
  }
}
