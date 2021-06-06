import { BaseComponent } from "../base-component";
import './popup.scss'

export class Popup extends BaseComponent {
  private popupTextContainer: BaseComponent;
  private coverElement = document.getElementById('cover');
  private bodyElement = document.body;
  private okButton: BaseComponent;
    
  constructor(popupTexp: string) {
    super ('div', ['popup-wrapper', 'hidden'] );
    this.popupTextContainer = new BaseComponent('div', ['popup-text-contaier']);
    this.okButton = new BaseComponent('div', ['popup-ok-button'] );
    this.popupTextContainer.element.innerText = popupTexp;
    this.okButton.element.innerText = 'OK';
    document.body.appendChild(this.element);
    this.element.appendChild(this.popupTextContainer.element);
    this.element.appendChild(this.okButton.element);
  }

  show() {
    this.bodyElement.classList.add('notScrollable');
    if (this.coverElement) this.coverElement.classList.remove('hidden');
    this.element.classList.remove('hidden');
    this.okButton.element.addEventListener('click', () => {
      this.removeAllChilds();
      document.body.removeChild(this.element);
      if (this.coverElement) this.coverElement.classList.add('hidden');
    });
  }
  

}

