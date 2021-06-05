import './settings.scss';
import { BaseComponent } from '../base-component';
import { createDOMElement } from '../../../shared/dom-functions';

export class Settings extends BaseComponent {
  classControlContainer: HTMLElement;

  constructor() {
    super('div', ['settings-container', 'hidden']);
    this.classControlContainer = this.element;
    const div = createDOMElement('div', ['settings'], 'SETTING-BLOCK HERE');
    this.element.appendChild(div);
  }

  show() {
    this.element.classList.remove('hidden');
  }

  hide() {
    this.element.classList.add('hidden');
  }
}
