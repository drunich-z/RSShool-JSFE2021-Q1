import './input-avatar.scss';
import { createDOMElement } from "../../../../shared/dom-functions";
import { BaseComponent } from "../../base-component";
import { Input } from "./input";
import avaPict from '../../../../assets/resource/avatar.png'
 

export class InputAvatar extends BaseComponent {
  input: Input;
  avatarImage: HTMLElement;
  
  constructor() {
    super('div', ['ava-input-container']);
    this.input = new Input('file', 'your-ava', ['ava-input']);
    this.avatarImage = createDOMElement('img',['ava-img'], '');
    this.avatarImage.setAttribute('src', avaPict);
    this.avatarImage.setAttribute('alt', 'ava');
    this.element.appendChild(this.avatarImage);
    this.element.appendChild(this.input.element);

    this.initListener();
  }

  initListener() {
    this.input.element.addEventListener('change', (e)=>this.onAvaPreload(e) )
  }

  private async onAvaPreload(e:Event) {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const loadedImage = await this.ReadImageFile(file);
    this.avatarImage.setAttribute('src', loadedImage as string);
  }

  private ReadImageFile(files: File) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = () => resolve(reader.result);
    });
  }
}