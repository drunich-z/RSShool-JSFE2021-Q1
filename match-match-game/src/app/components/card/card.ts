import './card.scss';
import { BaseComponent } from '../base-component';

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  isFlipped = false;

  constructor(readonly image: string) {
    super('div', ['card-container']);
    this.element.innerHTML = `
      <div class="card">
        <div class="card__front" style="background-image: url('./images/${image}'")></div>
        <div class="card__back"></div>
      </div>
    `;
  }

  flipToBack() {
    this.isFlipped = true;
    return this.flip(true);
  }

  flipToFront() {
    this.isFlipped = false;
    return this.flip();
  }

  showError(): void {
    this.element.classList.add('error');
  }

  showValid(): void {
    this.element.classList.add('valid');
  }

  removeError(): void {
    this.element.classList.remove('error');
  }

  removeValid() {
    this.element.classList.remove('valid');
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle(FLIP_CLASS, isFront);
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
