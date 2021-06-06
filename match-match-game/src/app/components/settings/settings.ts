import './settings.scss';
import { BaseComponent } from '../base-component';
import { createDOMElement } from '../../../shared/dom-functions';
import { BoxSelect } from './box-select';

export class Settings extends BaseComponent {
  fieldSizeSettings: BoxSelect;
  cardFaceSettings: BoxSelect;

  constructor() {
    super('div', ['settings-wrapper', 'hidden']);
    const settingsContainer = createDOMElement('div', ['settings-container'], '');
    this.element.appendChild(settingsContainer);
    settingsContainer.appendChild(createDOMElement('h3', ['settings-title'], 'GAME SETTINGS'));
      const boxFieldSelectContainer = createDOMElement('div', ['field-size-container'], '');
    settingsContainer.appendChild(boxFieldSelectContainer);
      boxFieldSelectContainer.appendChild(createDOMElement('div', ['field-text'], 'Field size'))
      this.fieldSizeSettings = new BoxSelect('field-settings', ['4x4', '6x6'], 'FIELD SETTINGS');
        boxFieldSelectContainer.appendChild(this.fieldSizeSettings.element);
      const cardFaceSelectContainer = createDOMElement('div', ['cards-face-container'], '');
    settingsContainer.appendChild(cardFaceSelectContainer);
      cardFaceSelectContainer.appendChild(createDOMElement('div', ['cards-text'], 'Cards face'))

      this.cardFaceSettings = new BoxSelect('cards-settings', ['dogs', 'cats'], 'CARD FACE SETTINGS');
      cardFaceSelectContainer.appendChild(this.cardFaceSettings.element);

  }

  show() {
    this.element.classList.remove('hidden');
  }

  hide() {
    this.element.classList.add('hidden');
  }
}
