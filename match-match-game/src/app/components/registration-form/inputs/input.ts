import './input.scss'
import { BaseComponent } from "../../base-component";

export class Input extends BaseComponent {
  
  constructor(
    type: string = 'text', 
    placeholder: string = 'placeholder',
    classname: string[] = [''],
    pattern: string = '', 
    title: string = ''
    ){
    super ('input', classname);
    this.element.setAttribute('type', type);
    this.element.setAttribute('placeholder', placeholder);
    if (pattern) this.element.setAttribute('pattern', pattern);
    if (title) this.element.setAttribute('title', title);
  
    this.initClasslistener();
  }

  initOutclassListener (callback: any) {
    this.element.addEventListener('input', callback);
  }

  initClasslistener() {
    this.element.addEventListener('input', () => {
      if ((this.element as HTMLInputElement).validity.valid) {
        this.element.classList.add('valid');
      } else this.element.classList.remove('valid');
    });
  }
  
  clear() {
    (this.element as HTMLInputElement).value = '';
  }

}



