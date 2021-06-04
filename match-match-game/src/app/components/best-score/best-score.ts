import './best-score.scss';
import { BaseComponent } from '../base-component';
import { PlayerScore } from '../database/PlayerScore.class';
import { createDOMElement } from '../../../shared/dom-functions';

export class BestScore extends BaseComponent {
  classControlContainer: HTMLElement;

  constructor() {
    super('div', ['best-score-container', 'hidden']);
    this.classControlContainer = this.element;
  }

  show(bestScoreList: PlayerScore[]){
    this.removeAllChilds();
    this.element.classList.remove('hidden');
    const ul = createDOMElement('ul', ['best-score-list']);
    this.element.appendChild(ul);
    
    for (let i=0; i < bestScoreList.length; i++) {
      let li = this.createListElement(bestScoreList[i]);
      ul.appendChild(li);
    }
  }
  
  hide() {
    this.element.classList.add('hidden');
  }

  private createListElement(player: PlayerScore){
    const name = `${player.name} ${player.surname}`;
    const email = player.email;
    const score = player.score;
    const avatarPath = './assets/resource/logo-score.svg';
    
    const li = createDOMElement('li');
    
      const divPlayerInfoContainer = createDOMElement('div', ['player-info-container']);
        const img = createDOMElement('img', ['avatar']);
              img.setAttribute('src', avatarPath);
              img.setAttribute('alt', 'avatar') ;

        const divNameEmailContainer = createDOMElement('div', ['name-email-container']);
          const divName = createDOMElement('div', ['name'], name);
          const divEmail = createDOMElement('div', ['email'], email);

      const divScoreContainer = createDOMElement('div', ['score-container']);
        const divScoreText = createDOMElement('div', ['score-text'], 'Score:');
        const divScoreValue = createDOMElement('div', ['score-value'], `${score}`);

    divNameEmailContainer.appendChild(divName);
    divNameEmailContainer.appendChild(divEmail);

    divPlayerInfoContainer.appendChild(img);
    divPlayerInfoContainer.appendChild(divNameEmailContainer);

    divScoreContainer.appendChild(divScoreText);
    divScoreContainer.appendChild(divScoreValue);

    li.appendChild(divPlayerInfoContainer);
    li.appendChild(divScoreContainer);

    return li;
  }
}