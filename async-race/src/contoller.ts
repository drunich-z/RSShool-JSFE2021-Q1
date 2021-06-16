import Store from './shared/store';
import GaragePage from './pages/garage/garage';
import PageControls from './controls/pageControls';
import WinnersPage from './pages/winners/winners';
import CarModifyControls from './controls/carModifyControls';
import CarControls from './controls/carControls';
import RaceControls from './controls/raceControls';

async function handleClickControl(event: MouseEvent): Promise<void> {
  const target = (event.target as HTMLButtonElement);
  if (!target) return;
  if (target.classList.contains('next-button')) PageControls.buttonNextPrevHandle('next');
  if (target.classList.contains('prev-button')) PageControls.buttonNextPrevHandle('prev');
  if (target.classList.contains('table-wins')) PageControls.reSortWinnersTable('wins');
  if (target.classList.contains('table-time')) PageControls.reSortWinnersTable('time');
  if (target.classList.contains('start-engine-button')) CarControls.carStartDrive(target);
  if (target.classList.contains('stop-engine-button')) CarControls.carStopDrive(target);
  if (target.classList.contains('select-button')) CarControls.selectButtonHandle(target);
  if (target.classList.contains('remove-button')) CarControls.removeButtonHandle(target);
  if (target.classList.contains('generator-button')) RaceControls.generateExtraCarsHandle(target);
  if (target.classList.contains('race-button')) RaceControls.raceHandle(target);
  if (target.classList.contains('reset-button')) RaceControls.resetHandle(target);
}

export default {
  async garageRoute(): Promise<void> {
    PageControls.switchView('garage');
    Store.view = 'garage';
    PageControls.updateNextPrevButtonsState('garage');
  },

  async winnersRoute(): Promise<void> {
    if (PageControls.winnersHTMLSection) PageControls.winnersHTMLSection.innerHTML = WinnersPage.renderWinners();
    PageControls.switchView('winners');
    Store.view = 'winners';
    PageControls.updateNextPrevButtonsState('winners');
  },

  async initControlls(): Promise<void> {
    PageControls.init();
    CarModifyControls.init();
    RaceControls.init();
    (PageControls.garageHTMLSection as HTMLElement).innerHTML = GaragePage.renderGarage();
    document.body.addEventListener('click', (e) => handleClickControl(e));
    CarModifyControls.listenCreateCar();
    CarModifyControls.listenUpdateCar();
  },
};
