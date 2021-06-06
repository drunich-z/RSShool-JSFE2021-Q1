import './cards-field.scss';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';

const SHOW_TIME = 10000;

export class CardsField extends BaseComponent {
  private cards: Card[] = [];
  _startShowTime: number;

  constructor() {
    super('div', ['cards-field']);
    this._startShowTime = SHOW_TIME;
  }
  startShowTime():number {
    return this._startShowTime;
  }

  clear() {
    this.cards = [];
    this.element.innerHTML = '';
  }

  async addCards(cards: Card[]) {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, SHOW_TIME);
    return new Promise((resolve, reject) => setTimeout(resolve, SHOW_TIME));
  }
}
