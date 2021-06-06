import { delay } from '../../../shared/delay';
import { BaseComponent } from '../base-component';
import { Card } from '../card/card';
import { CardsField } from '../cards-field/cards-field';
import { DBBestScore } from '../database/DBBestScore.class';
import { Timer } from '../timer/timer';
import './game.scss';
import { Popup } from '../popup/popup';

const FLIP_DELAY = 2000;

export class Game extends BaseComponent {
  private readonly cardsField: CardsField;

  private activeCard?: Card;

  private isAnimation = false;

  private isGameStopped = true;

  private isGameWinned = false;

  private timer: Timer;

  private cardsTotalCount = 0;

  private cardsMatchedCount = 0;

  private totalAttempts = 0;

  private dbBestscore: DBBestScore;

  private gameStartControl: HTMLElement | null;

  private gameStopControl: HTMLElement | null;

  constructor(
    gameStartControl: HTMLElement | null,
    gameStopControl: HTMLElement | null,
  ) {
    super('div', ['game-wrapper']);
    this.cardsField = new CardsField();
    this.element.appendChild(this.cardsField.element);
    this.timer = new Timer();
    this.dbBestscore = new DBBestScore('drunich-z', 'BestScore');
    this.gameStartControl = gameStartControl;
    this.gameStopControl = gameStopControl;
  }

  async newGame(images: string[]): Promise<void> {
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

    this.timer.startCountDown(this.cardsField.startShowTime());
    await (this.cardsField.addCards(cards));
    if (!this.isGameStopped) this.timer.restart();
    else this.timer.stop();
  }

  getWinPoints = (): number => {
    const time = this.timer.getTotalSeconds();
    const attemps = this.cardsMatchedCount;
    const res = attemps * 100 - time * 10;
    if (res >= 0) return res;
    return 0;
  };

  finishGame(): void {
    this.isGameStopped = true;
    this.timer.stop();
    this.activeCard = undefined;
    this.isAnimation = false;
    this.gameStopControl?.classList.add('hidden');
    this.gameStartControl?.classList.remove('hidden');

    if (this.isGameWinned) {
      const points = this.getWinPoints();
      const player = JSON.parse(localStorage.user);
      this.dbBestscore.add({
        uid: player.email,
        name: player.name,
        surname: player.surname,
        email: player.email,
        avatar: player.avatar,
        score: points,
      });
      const popup = new Popup(`YOU ARE WIN! CONDRATULATIONS! YOUR TOTAL SCORE IS ${points}!`);
      popup.show();
    }
    this.cardsMatchedCount = 0;
  }

  isGameIsRunning(): boolean {
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
      this.totalAttempts += 1;
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
