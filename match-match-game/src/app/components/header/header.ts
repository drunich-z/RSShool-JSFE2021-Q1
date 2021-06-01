import './header.scss';
import { BaseComponent } from '../base-component';

// переделать, наверное, надо...построить хедер апендами
export class Header extends BaseComponent {
  controlPlayer: HTMLElement | null;

  controlGameStart: HTMLElement | null;

  controlGameStop: HTMLElement | null;

  pointerAboutGame: HTMLElement | null;

  pointerGameScore: HTMLElement | null;

  pointerGameSettings: HTMLElement | null;

  constructor() {
    super('div', ['header']);
    this.element.innerHTML = `
      <div class="header__wrapper">
        <div class="logo-game">
          <img src="./assets/resource/logo-game.svg" alt="logo">
        </div>
        <nav class="header__nav">
          <ul>
            <li>
              <a class = "pointerAboutGame" href="#">
                <img src="./assets/resource/logo-about.svg" alt="logo"> 
                About Game
              </a>
            </li>
            <li>
            <a class = "pointerGameScore" href="#">
                <img src="./assets/resource/logo-score.svg" alt="logo"> 
                Best Score
              </a>
            </li>
            <li>
            <a class = "pointerGameSettings" href="#">
                <img src="./assets/resource/logo-settings.svg" alt=""> 
                Game Settings
              </a>
            </li>
          </ul>
        </nav>
        <div class="controls">
          <div id="control__user" class="control__user ">
            register new user
          </div>
          <div id="control__game-start" class="control__game-start ">
            start game
          </div>
          <div id="control__game-stop" class="control__game-stop hidden">
            stop game
          </div>
        </div>
      </div>
    `;
    this.controlPlayer = null;
    this.controlGameStart = null;
    this.controlGameStop = null;
    this.pointerAboutGame = null;
    this.pointerGameScore = null;
    this.pointerGameSettings = null;
  }

  initAllControl() {
    this.controlPlayer = document.getElementById('control__user');
    this.controlGameStart = document.getElementById('control__game-start');
    this.controlGameStop = document.getElementById('control__game-stop');
    this.pointerAboutGame = document.getElementById('control__user');
    this.pointerGameScore = document.getElementById('control__user');
    this.pointerGameSettings = document.getElementById('control__user');
  }

  initNewPlayerButton() {
    if (this.controlPlayer) this.controlPlayer.addEventListener('click', () => console.log('test'));
  }

  initStartGameButton() {

  }

  initStopGameButton() {

  }
}
