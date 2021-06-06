import { Game } from './components/game/game';
import { ImageCategoryModel } from '../models/image-category-model';

export class App {
  private readonly game: Game;
  private gameStartControl: HTMLElement | null;
  private gameStopControl: HTMLElement | null;


  classControlContainer: HTMLElement;

  constructor(private readonly rootElement: HTMLElement, 
    gameStartControl: HTMLElement | null,
    gameStopControl: HTMLElement | null,
    ) {
    this.gameStartControl = gameStartControl;
    this.gameStopControl = gameStopControl;
    this.game = new Game(this.gameStartControl,
                         this.gameStopControl);
    this.rootElement.appendChild(this.game.element);
    this.classControlContainer = this.rootElement;// хм)
    
  }

  async startGame() {
    const res = await fetch('./images.json');
    const [cat]: ImageCategoryModel[] = await res.json();
    const images = cat.images.map((name) => `${cat.category}/${name}`);
    this.game.newGame(images);
  }

  stopGame() {
    this.game.finishGame();
  }

  isCurrentGameIsRunning() {
    return this.game.isGameIsRunning();
  }

  show() {
    this.game.element.classList.remove('hidden');
  }

  hide() {
    this.game.element.classList.add('hidden');
  }
}
