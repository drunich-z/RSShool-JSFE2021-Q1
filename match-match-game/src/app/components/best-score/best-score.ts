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

  outputScoreList(bestScoreList: PlayerScore[]){
    this.removeAllChilds();
    this.element.classList.remove('hidden');
    const ul = createDOMElement('ul', ['best-score-list']);
    this.element.appendChild(ul);
    
    for (let i=0; i < bestScoreList.length; i++) {
      let li = this.makeListElement(bestScoreList[i]);
      ul.appendChild(li);
    }
  }
  
  hideScoreList() {
    this.element.classList.add('hidden');
  }

  private makeListElement(player: PlayerScore){
    const name = `${player.name} ${player.surname}`;
    const email = player.email;
    const score = `Score: ${player.score}`;
    const avatarPath = './assets/resource/logo-score.svg';
    
    const li = createDOMElement('li');
    
      const divPlayerInfoContainer = createDOMElement('div', ['player-info-container']);
        const img = createDOMElement('img', ['avatar']);
              img.setAttribute('src', avatarPath);
              img.setAttribute('alt', 'avatar') ;

        const divNameEmailContainer = createDOMElement('div', ['name-email-container']);
          const divName = createDOMElement('div', ['name'], name);
          const divEmail = createDOMElement('div', ['email'], email);

      const divScore = createDOMElement('div', ['score'], score);

    divNameEmailContainer.appendChild(divName);
    divNameEmailContainer.appendChild(divEmail);

    divPlayerInfoContainer.appendChild(img);
    divPlayerInfoContainer.appendChild(divNameEmailContainer);

    li.appendChild(divPlayerInfoContainer);
    li.appendChild(divScore);

    return li;
  }

}