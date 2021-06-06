import './header.scss';
import { BaseComponent } from '../base-component';
// import avaPict from '../../../assets/resource/avatar.png';

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
              <a id = "control__about" class = "control__about" href="#">
                <img src="./assets/resource/logo-about.svg" alt="logo"> 
                About Game
              </a>
            </li>
            <li>
            <a id = "control__score" class = "control__score" href="#">
                <img src="./assets/resource/logo-score.svg" alt="logo"> 
                Best Score
              </a>
            </li>
            <li>
            <a id = "control__settings" class = "control__settings" href="#">
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
          <div id="control__game-start" class="control__game-start hidden">
            start game
          </div>
          <div id="control__game-stop" class="control__game-stop hidden">
            stop game
          </div>
          <div id="control__user-logged" class="control__user-logged hidden">
            <img id="user-avatar" class="user-avatar" src="./assets/resource/avatar.png" alt="">
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

  initAllControl(): void {
    this.controlPlayer = document.getElementById('control__user');
    this.controlGameStart = document.getElementById('control__game-start');
    this.controlGameStop = document.getElementById('control__game-stop');
    this.pointerAboutGame = document.getElementById('control__about');
    this.pointerGameScore = document.getElementById('control__score');
    this.pointerGameSettings = document.getElementById('control__settings');
  }

  initNewPlayerButton(): void {
    if (this.controlPlayer) this.controlPlayer.addEventListener('click', () => console.log('test'));
  }
}
