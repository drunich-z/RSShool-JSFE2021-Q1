import './registration-form.scss';
import { BaseComponent } from "../base-component";
import { createDOMElement } from '../../../shared/dom-functions';
import { Input } from './input';

export class RegistrationForm extends BaseComponent {
  private nameInput: Input;
  private surnameInput: Input;
  private emailInput: Input;
  private avatarInput: Input;
    
  constructor() {
    super ('form', ['registration-form', 'hidden']);
    this.nameInput = new Input('text', 'input your name here', ['input-name']);
    this.surnameInput = new Input('text', 'input your surame here', ['input-surname']);
    this.emailInput = new Input('email', 'input your email here', ['input-email']);
    this.avatarInput = new Input('file', 'input your avatar picture here', ['input-avatar']);

    const inputs = createDOMElement('div', ['inputs'], '');
    this.element.appendChild(inputs);
    inputs.appendChild(this.nameInput.element);
    inputs.appendChild(this.surnameInput.element);
    inputs.appendChild(this.emailInput.element);
    
    const pictureInput = createDOMElement('div', ['picture-container'], '');
    this.element.appendChild(pictureInput);
    pictureInput.appendChild(this.avatarInput.element);
  }

  show(){
    this.element.classList.remove('hidden');
  }
  
  hide() {
    this.element.classList.add('hidden');
  }


}