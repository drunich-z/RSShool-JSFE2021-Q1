import './styles/styles.scss';
import { App } from './app/app';
import { Header } from './app/components/header/header';
import { AboutGame } from './app/components/about-game/about-game';
//import { DataAccess } from './app/components/database/DataAccess.class';
//import { PlayerScore } from './app/components/database/PlayerScore.class'
import { DBBestScore } from './app/components/database/DBBestScore.class'
import { BestScore } from './app/components/best-score/best-score';

const idbScore = new DBBestScore('drunich-z', 'BestScore');
idbScore.addFivePlayersOnStart();
const about = new AboutGame();
const bestScoreBlock = new BestScore();

//let count = 0;

window.onload = () => {
  const bodyElement = document.body;
  const coverElem = document.getElementById('cover');
  const headerControls = new Header();
  bodyElement.prepend(headerControls.element);
  headerControls.initAllControl();

  const appElement = document.getElementById('app');
  if (!appElement) throw Error('App root element not found');
  
  
  appElement.appendChild(about.element);
  appElement.appendChild(bestScoreBlock.element);

  const gameApp = new App(appElement);

  headerControls.controlGameStart?.addEventListener('click', () => {
    gameApp.start();
    headerControls.controlGameStart?.classList.add('hidden');
    headerControls.controlGameStop?.classList.remove('hidden');
    about.classControlContainer.classList.add('hidden');
    // bodyElement.classList.add("notScrollable");
    // coverElem?.classList.remove("hidden");
    // headerControls.controlGameStop?.classList.add("visible__active");
    // bodyElement.classList.add('cover');
  });
  headerControls.controlGameStop?.addEventListener('click', () => {
    gameApp.stop();
    headerControls.controlGameStart?.classList.remove('hidden');
    headerControls.controlGameStop?.classList.add('hidden');
    // bodyElement.classList.remove("notScrollable");
    // coverElem?.classList.add("hidden");
    // headerControls.controlGameStop?.classList.remove("visible__active");
  });
  headerControls.controlPlayer?.addEventListener('click', testBestScoreShow);
  headerControls.pointerGameScore?.addEventListener('click', () => console.log('111'))
};

async function testDbWork() {
  let result: any;
  let result1: any;
  result = await idbScore.retrieve();
    //result1.then((res: any) => { result1 = res; });
  result1 = await idbScore.getArrayOfFirstNSortedByScore(9);
  console.log('vasya');
  console.log(result);
  console.log(result1);
}

async function testBestScoreShow() {

  let result: any;
  result = await idbScore.getArrayOfFirstNSortedByScore(9);
  about.classControlContainer.classList.add('hidden');
  bestScoreBlock.outputScoreList(result);
  
}
