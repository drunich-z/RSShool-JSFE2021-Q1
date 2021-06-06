import './input-avatar.scss';
import { createDOMElement } from '../../../../shared/dom-functions';
import { BaseComponent } from '../../base-component';
import { Input } from './input';
import avaPict from '../../../../assets/resource/avatar.png';

export class InputAvatar extends BaseComponent {
  input: Input;

  avatarImage: HTMLElement;

  avatarBase64: string;

  constructor() {
    super('div', ['ava-input-container']);
    this.input = new Input('file', 'your-ava', ['ava-input']);
    this.avatarImage = createDOMElement('img', ['ava-img'], '');
    this.avatarImage.setAttribute('src', avaPict);
    this.avatarImage.setAttribute('alt', 'ava');
    this.element.appendChild(this.avatarImage);
    this.element.appendChild(this.input.element);
    this.avatarBase64 = '';
    this.initListener();
  }

  initListener(): void {
    this.input.element.addEventListener('change', (e) => this.onAvaPreload(e));
  }

  clear(): void {
    (this.element as HTMLInputElement).files = null;
    (this.element as HTMLInputElement).value = '';
    this.avatarImage.setAttribute('src', avaPict);
    this.avatarBase64 = '';
  }

  private async onAvaPreload(e:Event) {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const loadedImage = await this.ReadImageFile(file);
    this.avatarBase64 = loadedImage as string;
    this.avatarImage.setAttribute('src', loadedImage as string);
  }

  private ReadImageFile = (files: File) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = () => resolve(reader.result);
  });

  toDataURL = (url: string): void => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      }));
  };
}
