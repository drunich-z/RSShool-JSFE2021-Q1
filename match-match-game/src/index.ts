import './styles/styles.scss';
import { App } from './app/app';
import { Header } from './app/components/header/header';
import { AboutGame } from './app/components/about-game/about-game';
import { DBBestScore } from './app/components/database/DBBestScore.class';
import { BestScore } from './app/components/best-score/best-score';
import { Settings } from './app/components/settings/settings';
import { RegistrationForm } from './app/components/registration-form/registration-form';
import { createDOMElement } from './shared/dom-functions';

const bodyElement = document.body;
const appElement = document.getElementById('app');
if (!appElement) throw Error('App root element not found');

const idbScore = new DBBestScore('drunich-z', 'BestScore');
idbScore.addFivePlayersOnStart();

const headerControls = new Header();
bodyElement.prepend(headerControls.element);
headerControls.initAllControl();

const aboutPage = new AboutGame();
appElement.appendChild(aboutPage.element);

const bestScorePage = new BestScore();
appElement.appendChild(bestScorePage.element);

const settingsPage = new Settings();
appElement.appendChild(settingsPage.element);

const gamePage = new App(appElement,
  headerControls.controlGameStart,
  headerControls.controlGameStop);

const regNewPlayer = new RegistrationForm();
bodyElement.append(regNewPlayer.element);

const coverElement = createDOMElement('div', ['cover', 'hidden']);
bodyElement.append(coverElement);
coverElement.setAttribute('id', 'cover');

function hideAllPages() {
  aboutPage.hide();
  bestScorePage.hide();
  settingsPage.hide();
  gamePage.hide();
}

function registerNewPlayer() {
  bodyElement.classList.add('notScrollable');
  coverElement.classList.remove('hidden');
  regNewPlayer.show();
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

async function BestScoreShow() {
  const result = await idbScore.getArrayOfFirstNSortedByScore(10);
  hideAllPages();
  StopGameIfItIsRunning();
  bestScorePage.showBestScore(result);
}

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

coverElement.addEventListener('click', () => {
  bodyElement.classList.remove('notScrollable');
  coverElement.classList.add('hidden');
  regNewPlayer.hide();
});
