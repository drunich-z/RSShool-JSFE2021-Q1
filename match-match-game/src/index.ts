import './styles/styles.scss';
import { App } from './app/app';
import { Header } from './app/components/header/header';
import { AboutGame } from './app/components/about-game/about-game';
import { DBBestScore } from './app/components/database/DBBestScore.class'
import { DBCurrentPlayer } from './app/components/database/DBCurrentPlayer.class';
import { BestScore } from './app/components/best-score/best-score';
import { Settings } from './app/components/settings/settings';
import { RegistrationForm } from './app/components/registration-form/registration-form';
import { createDOMElement } from './shared/dom-functions';

const bodyElement = document.body;
const appElement = document.getElementById('app');
if (!appElement) throw Error('App root element not found');

const idbScore = new DBBestScore('drunich-z', 'BestScore');
idbScore.addFivePlayersOnStart();

// const idbPlayer = new DBCurrentPlayer('drunich-z', 'CurrentPlayer');
// idbPlayer.setNone();

const headerControls = new Header();
bodyElement.prepend(headerControls.element);
headerControls.initAllControl();

const aboutPage = new AboutGame();
appElement.appendChild(aboutPage.element);

const bestScorePage = new BestScore();
appElement.appendChild(bestScorePage.element);

const settingsPage = new Settings();
appElement.appendChild(settingsPage.element);

const gamePage = new App(appElement);

const regNewPlayer = new RegistrationForm();
bodyElement.append(regNewPlayer.element);

const coverElement = createDOMElement('div', ['cover', 'hidden']);
bodyElement.append(coverElement);
coverElement.setAttribute('id', 'cover');

window.onload = () => {
  headerControls.controlGameStart?.addEventListener('click', () => {
    hideAllPages();
    gamePage.show();
    gamePage.startGame();
    headerControls.controlGameStart?.classList.add('hidden');
    headerControls.controlGameStop?.classList.remove('hidden');
  });
  
  headerControls.controlGameStop?.addEventListener('click', () => {
    gamePage.stopGame();
    headerControls.controlGameStart?.classList.remove('hidden');
    headerControls.controlGameStop?.classList.add('hidden');
  });
  
  headerControls.controlPlayer?.addEventListener('click', registerNewPlayer);
  
  headerControls.pointerGameScore?.addEventListener('click', BestScoreShow);

  headerControls.pointerAboutGame?.addEventListener('click', () => {
    hideAllPages();
    StopGameIfItIsRunning();
    aboutPage.show();
  });

  headerControls.pointerGameSettings?.addEventListener('click', () => {
    hideAllPages();
    StopGameIfItIsRunning();
    settingsPage.show();
  });

};

async function BestScoreShow() {
  let result: any;
  result = await idbScore.getArrayOfFirstNSortedByScore(10);
  hideAllPages();
  StopGameIfItIsRunning();
  bestScorePage.show(result);
}

coverElement.addEventListener("click", () => {
  bodyElement.classList.remove("notScrollable");
  coverElement.classList.add("hidden");
  regNewPlayer.hide();
});

function registerNewPlayer() {
  bodyElement.classList.add("notScrollable");
  coverElement.classList.remove("hidden");
  regNewPlayer.show();
}

function hideAllPages() {
  aboutPage.hide();
  bestScorePage.hide();
  settingsPage.hide();
  gamePage.hide();
}

function StopGameIfItIsRunning() {
  if (gamePage.isCurrentGameIsRunning()) {
    gamePage.stopGame();
    if (headerControls.controlPlayer?.classList.contains('hidden')) {
      headerControls.controlGameStart?.classList.remove('hidden');
    }
    headerControls.controlGameStop?.classList.add('hidden');
  }
}

