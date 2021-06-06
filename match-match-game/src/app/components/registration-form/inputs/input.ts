import './input.scss';
import { BaseComponent } from '../../base-component';

export class Input extends BaseComponent {
  constructor(
    type = 'text',
    placeholder = 'placeholder',
    classname: string[] = [''],
    pattern = '',
    title = '',
  ) {
    super('input', classname);
    this.element.setAttribute('type', type);
    this.element.setAttribute('placeholder', placeholder);
    if (pattern) this.element.setAttribute('pattern', pattern);
    if (title) this.element.setAttribute('title', title);

    this.initClasslistener();
  }

  initOutclassListener(callback: ()=>void): void {
    this.element.addEventListener('input', callback);
  }

  initClasslistener(): void {
    this.element.addEventListener('input', () => {
      if ((this.element as HTMLInputElement).validity.valid) {
        this.element.classList.add('valid');
      } else this.element.classList.remove('valid');
    });
  }

  clear(): void {
    (this.element as HTMLInputElement).value = '';
  }
}
