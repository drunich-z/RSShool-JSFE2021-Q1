import './styles/styles.scss';
import { App } from './app/app';
import { Header } from './app/components/header/header';
import { AboutGame } from './app/components/about-game/about-game';
import { DBBestScore } from './app/components/database/DBBestScore.class'
import { BestScore } from './app/components/best-score/best-score';
import { Settings } from './app/components/settings/settings';

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

const gamePage = new App(appElement);

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


function registerNewPlayer() {
  return;
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
    headerControls.controlGameStart?.classList.remove('hidden');
    headerControls.controlGameStop?.classList.add('hidden');
  }
}

//let count = 0;
//const coverElem = document.getElementById('cover');
// bodyElement.classList.add("notScrollable");
// coverElem?.classList.remove("hidden");
// headerControls.controlGameStop?.classList.add("visible__active");
// bodyElement.classList.add('cover');
// bodyElement.classList.remove("notScrollable");
// coverElem?.classList.add("hidden");
// headerControls.controlGameStop?.classList.remove("visible__active");