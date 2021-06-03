import { BaseComponent } from "../base-component";

export class Input extends BaseComponent {
   
  constructor(
    type: string = 'text', 
    placeholder: string = 'placeholder',
    classname: string[] = ['']
    ){
    super ('input', classname);
    this.element.setAttribute('type', type);
    this.element.setAttribute('placeholder', placeholder);
  }
}


