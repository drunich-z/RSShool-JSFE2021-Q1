import { delay } from '../../../shared/delay';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { DBBestScore } from '../database/DBBestScore.class';
import { Timer } from '../timer/timer';
import './game.scss';

const FLIP_DELAY = 2000;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  private isGameStopped = false;

  private isGameWinned = false;

  private timer: Timer;

  private cardsTotalCount = 0;

  private cardsMatchedCount = 0;

  private dbBestscore: DBBestScore;

  constructor() {
    super('div', ['game-wrapper']);
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
    this.timer = new Timer();
    this.dbBestscore = new DBBestScore('drunich-z', 'BestScore');
  }

  async newGame(images: string[]) {
    this.isGameStopped = false;
    this.isGameWinned = false;
    this.cardsTotalCount = images.length;
    this.cardsField.clear();
    this.element.prepend(this.timer.element);
    const cards = images
      .concat(images)
      .map((url) => new Card(url))
      .sort(() => Math.random() - 0.5);

    cards.forEach((card) => {
      card.element.addEventListener('click', () => this.cardHandler(card));
    });

    this.timer.start();
    await (this.cardsField.addCards(cards));
    this.timer.restart();
  }

  finishGame() {
    this.isGameStopped = true;
    this.timer.stop();
    this.cardsMatchedCount = 0;
    this.activeCard = undefined;
    this.isAnimation = false;
    if (this.isGameWinned) {
      const player = JSON.parse(localStorage.user);
      this.dbBestscore.add({
        uid: player.email,
        name: player.name,
        surname: player.surname,
        email: player.email,
        avatar: player.avatar,
        score: 333,
      });
      console.log('GAME IS WINNED');
      alert('Y R WIN');
    }
  }

  isGameIsRunning() {
    return !this.isGameStopped;
  }

  private async cardHandler(card: Card) {
    if (this.isGameStopped) return;
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activeCard.image !== card.image) {
      card.showError();
      this.activeCard.showError();
      await delay(FLIP_DELAY);
      await Promise.all([this.activeCard.flipToBack(), card.flipToBack()]);
      card.removeError();
      this.activeCard.removeError();
      this.activeCard = undefined;
      this.isAnimation = false;
      return;
    }

    card.showValid();
    this.activeCard.showValid();
    this.activeCard = undefined;
    this.isAnimation = false;
    this.cardsMatchedCount += 1;

    if (this.cardsMatchedCount === this.cardsTotalCount) {
      this.isGameWinned = true;
      this.finishGame();
    }
  }
}
