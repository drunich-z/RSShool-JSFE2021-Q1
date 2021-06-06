import { BaseComponent } from '../base-component';
import './about-game.scss';
// import aboutSvg from '../../../assets/resource/about.svg';

export class AboutGame extends BaseComponent {
  classControlContainer: HTMLElement;

  constructor() {
    super('div', ['about-game-container']);
    this.classControlContainer = this.element;
    const img = document.createElement('img');
    img.setAttribute('src', './assets/resource/about_pointer_circles.svg');
    img.classList.add('about-picture');
    img.setAttribute('alt', 'About');
    this.element.appendChild(img);
  }
}
