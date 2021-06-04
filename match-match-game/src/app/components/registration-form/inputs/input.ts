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

    this.element.addEventListener('input', () => {
      if ((this.element as HTMLInputElement).validity.valid) {
        this.element.classList.add ('valid');
      } else {
        this.element.classList.remove ('valid');
      }
    })
  }

  initListener (callback:any) {
    this.element.addEventListener('input', callback);
  }

  
}



