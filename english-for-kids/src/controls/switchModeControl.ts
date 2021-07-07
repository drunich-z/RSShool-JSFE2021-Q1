import Store from '../shared/store';
import BurgerControl from './burgerControl';

export default {
  switchInput: document.getElementById('switch-input') as HTMLInputElement,

  initSwitch(): void {
    this.switchInput = document.getElementById('switch-input') as HTMLInputElement;
    this.switchInput.addEventListener('change', this.switchHandler.bind(this));
  },

  switchHandler(): void {
    BurgerControl.burgerMenu.classList.toggle('green');
    if (this.switchInput.checked) Store.applicationMode = 'train';
    else Store.applicationMode = 'game';
  },
};
