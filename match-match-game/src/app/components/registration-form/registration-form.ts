import './registration-form.scss';
import { BaseComponent } from "../base-component";
import { createDOMElement } from '../../../shared/dom-functions';
import { Input } from './inputs/input';
import { InputAvatar } from './inputs/input-avatar';
import { RegButton } from './reg-button';
import { validateName} from './validate-func';
import { validateSurname } from './validate-func';
import { validateEmail } from './validate-func';

export class RegistrationForm extends BaseComponent {
  private nameInput: Input;
  private surnameInput: Input;
  private emailInput: Input;
  private avatarInput: InputAvatar;
  private addButton: RegButton;
  private cancelButton: RegButton;
    
  constructor() {
    super ('form', ['registration-form', 'hidden']);
    this.nameInput = new Input('text', 'input your name here', ['input-name']);
    this.surnameInput = new Input('text', 'input your surname here', ['input-surname']);
    this.emailInput = new Input('email', 'input your email here', ['input-email']);
    this.avatarInput = new InputAvatar();
    this.addButton  = new RegButton(['button', 'add-button'], 'add user');
    this.cancelButton  = new RegButton(['button', 'cancel-button'], 'cancel');
    this.initForm();
    this.initValidate();
  }

  private initForm(){
    const formTitle = createDOMElement('h3', ['form-title'], 'Register new Player');
    const inputsContainer = createDOMElement('div', ['inputs-container'], '');
      const inputs = createDOMElement('div', ['inputs'], '');
      this.element.appendChild(inputs);
        inputs.appendChild(this.nameInput.element);
        inputs.appendChild(this.surnameInput.element);
        inputs.appendChild(this.emailInput.element);

    inputsContainer.appendChild(inputs);
    inputsContainer.appendChild(this.avatarInput.element);

    const buttonsContainer = createDOMElement('div', ['buttons-container'], '')
      buttonsContainer.appendChild(this.addButton.element);
      buttonsContainer.appendChild(this.cancelButton.element);
   
    this.element.appendChild(formTitle);
    this.element.appendChild(inputsContainer);
    this.element.appendChild(buttonsContainer);
  }

  private initValidate(){
    this.nameInput.initValidateListener(() => this.funk(this.nameInput, validateName));
    this.surnameInput.initValidateListener(() => this.funk(this.surnameInput, validateSurname));
    this.emailInput.initValidateListener(() => this.funk(this.emailInput, validateEmail));
  }

  funk(input: Input, validate: any) {
    const inputValue = (input.element as HTMLInputElement).value;
    console.log(inputValue);
    if (validate(inputValue)) input.element.classList.add('valid');
    else input.element.classList.remove('valid');
      
  }

  show(){
    this.element.classList.remove('hidden');
  }
  
  hide() {
    this.element.classList.add('hidden');
  }




}