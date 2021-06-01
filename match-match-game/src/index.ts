import './styles/styles.scss';
import { App } from './app/app';
import { Header } from './app/components/header/header';
import { AboutGame } from './app/components/about-game/about-game';
import { DataAccess } from './app/components/database/DataAccess.class';
import { PlayerScore } from './app/components/database/PlayerScore.class'

const idbScore = new DataAccess<PlayerScore>('drunich-z', 'BestScore');
let count = 0;

window.onload = () => {
  const bodyElement = document.body;
  const coverElem = document.getElementById('cover');
  const headerControls = new Header();
  bodyElement.prepend(headerControls.element);
  headerControls.initAllControl();

  const appElement = document.getElementById('app');
  if (!appElement) throw Error('App root element not found');
  const about = new AboutGame();
  appElement.appendChild(about.element);
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
  headerControls.controlPlayer?.addEventListener('click', testDbWork);
};

async function testDbWork() {
  let result: any;
  let result1: any;
  console.log('Vasya');
  count++;
  idbScore.add({ uid: `zverev-and@mail.ru-${count}`
      , name: 'Andrey'
      , surname: 'Zverev'
      , email: 'zverev-and@mail.ru'
      , score: count
    });
  //result1 = await idbScore.get('zverev-and@mail.ru-1');
  
  //result1.then((res: any) => { result1 = res; });
  console.log('vasya');
  console.log(result1);
}
