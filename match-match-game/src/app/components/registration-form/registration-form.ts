import './registration-form.scss';
import { BaseComponent } from "../base-component";
import { createDOMElement } from '../../../shared/dom-functions';
import { Input } from './inputs/input';
import { InputAvatar } from './inputs/input-avatar';
import { RegButton } from './reg-button';
import { validateName} from './validate-func';
import { validateSurname } from './validate-func';
import { validateEmail } from './validate-func';
import { PlayerScore } from '../database/PlayerScore.class';
import { DBBestScore } from '../database/DBBestScore.class';

export class RegistrationForm extends BaseComponent {
  private nameInput: Input;
  private surnameInput: Input;
  private emailInput: Input;
  private avatarInput: InputAvatar;
  private addButton: RegButton;
  private cancelButton: RegButton;
  testDB: DBBestScore;
  
  constructor() {
    const nameRegExp = '^[a-zA-Zа-яА-Я][a-zA-Za-zA-Zа-яА-Я0-9\s]{1,30}$';
    const emailRegExp = '^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
    //const nameRegExp = '^[А-Яа-я][a-zA-Z0-9\s]{1,30}$';
    //const emailRegExp = '/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';
    super ('form', ['registration-form', 'hidden']);
    
    this.nameInput = new Input('text', 'input your name here', ['input-name'], nameRegExp, 'Input correct name!');
    this.surnameInput = new Input('text', 'input your surname here', ['input-surname'], nameRegExp, 'Input correct surname!');
    this.emailInput = new Input('email', 'input your email here', ['input-email'], emailRegExp, 'Input correct email!');
    
    this.avatarInput = new InputAvatar();
    this.addButton  = new RegButton(['button', 'add-button'], 'add user');
    this.cancelButton  = new RegButton(['button', 'cancel-button'], 'cancel');
    
    this.testDB = new DBBestScore('drunich-z', 'BestScore');

    this.initForm();
    
    const form = this;
    this.nameInput.initOutclassListener(()=>this.formValidateHandle(form));
    this.surnameInput.initOutclassListener(()=>this.formValidateHandle(form));
    this.emailInput.initOutclassListener(()=>this.formValidateHandle(form));
    this.cancelButton.element.addEventListener('click', () => this.cancel(form));
    this.addButton.element.addEventListener('click', () => this.addPlayer(form));
  
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

  // allInputsValidateHandle(form:RegistrationForm) {
  //   if (validateName((form.nameInput.element as HTMLInputElement).value) &&
  //       validateSurname((form.surnameInput.element as HTMLInputElement).value) &&
  //       validateEmail((form.emailInput.element as HTMLInputElement).value)) {
  //     form.addButton.element.classList.add('active');
  //   } else form.addButton.element.classList.remove('active');
  // }

  private formValidateHandle(form:RegistrationForm) {
    if ((form.nameInput.element as HTMLInputElement).validity.valid &&
        (form.surnameInput.element as HTMLInputElement).validity.valid &&
        (form.emailInput.element as HTMLInputElement).validity.valid && 
        (form.nameInput.element as HTMLInputElement).value &&
        (form.surnameInput.element as HTMLInputElement).value &&
        (form.emailInput.element as HTMLInputElement).value)  {
      form.addButton.element.classList.add('active');
    } else form.addButton.element.classList.remove('active');
  }

  private cancel(form:RegistrationForm){
    form.nameInput.clear();
    form.surnameInput.clear();
    form.emailInput.clear();
    form.avatarInput.clear();
    form.addButton.element.classList.remove('active');
  }

  private addPlayer(form:RegistrationForm) {
    if (!form.addButton.element.classList.contains('active')) return;
    // form.testDB.add({ uid: 'check-uid'
    //            , name: (form.nameInput.element as HTMLInputElement).value
    //            , surname: (form.surnameInput.element as HTMLInputElement).value
    //            , email: (form.emailInput.element as HTMLInputElement).value
    //            , avatar: form.avatarInput.avatarBase64
    //            , score: 200
    //   });
    const player = {
      name: (form.nameInput.element as HTMLInputElement).value, 
      surname: (form.surnameInput.element as HTMLInputElement).value, 
      email: (form.emailInput.element as HTMLInputElement).value, 
      avatar: form.avatarInput.avatarBase64
    }
    localStorage.user = JSON.stringify(player);
    
    //эх...
    const controlUser = document.getElementById('control__user');
    const controlGameStart = document.getElementById('control__game-start');
    const controlUserLogged = document.getElementById('control__user-logged');
    const userAvatar = document.getElementById('user-avatar');
    const coverElement = document.getElementById('cover');
    const bodyElement = document.body;

    if (player.avatar) {
      userAvatar?.setAttribute('src', player.avatar);
    }
    userAvatar?.setAttribute('title', `${player.name} ${player.surname}`);
    controlGameStart?.classList.remove('hidden');
    controlUserLogged?.classList.remove('hidden');
    controlUser?.classList.add('hidden');
    bodyElement.classList.remove("notScrollable");
    coverElement?.classList.add("hidden");
    
    form.hide();
  
  }
 
  show(){
    this.element.classList.remove('hidden');
  }
  
  hide() {
    this.element.classList.add('hidden');
  }


}
