import './settings.scss';
import { BaseComponent } from '../base-component';
import { createDOMElement } from '../../../shared/dom-functions';

export class BoxSelect extends BaseComponent {
  private options: HTMLElement[]=[];
  constructor(classname: string, options: string[], selectName: string) {
    super('select', [classname]);
    this.element.setAttribute('required', 'required');
    this.element.setAttribute('name', selectName);
    for (let i = 0; i < options.length; i++) {
      this.options[i] = createDOMElement('option', ['select-options'], options[i]);
      this.element.appendChild(this.options[i]);
    }
  }

  initOutclassListener(callback: any) {
    this.element.addEventListener('change', callback);
  }


}
