import './cards-field.scss';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';

const SHOW_TIME = 10000;

export class CardsField extends BaseComponent {
  private cards: Card[] = [];

  private startShowTimer: number;

  constructor() {
    super('div', ['cards-field']);
    this.startShowTimer = SHOW_TIME;
  }

  startShowTime():number {
    return this.startShowTimer;
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  async addCards(cards: Card[]): Promise<void> {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, SHOW_TIME);
    return new Promise((resolve) => setTimeout(resolve, SHOW_TIME));
  }
}
