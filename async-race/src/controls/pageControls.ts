import PageGarage from '../pages/garage/garage';
import PageWinners from '../pages/winners/winners';
import Store from '../shared/store';

export default {
  garageHTMLSection: document.getElementById('garage') as HTMLElement,
  winnersHTMLSection: document.getElementById('winners-view') as HTMLElement,
  winnersViewHTMLSection: document.getElementById('winners-view') as HTMLElement,
  garageViewHTMLSection: document.getElementById('garage-view') as HTMLElement,

  prev: document.getElementById('prev') as HTMLButtonElement,
  next: document.getElementById('next') as HTMLButtonElement,

  garagePage: document.getElementById('garage-menu') as HTMLElement,
  winnersPage: document.getElementById('winners-menu') as HTMLElement,

  init(): void {
    this.garageHTMLSection = document.getElementById('garage') as HTMLElement;
    this.winnersHTMLSection = document.getElementById('winners-view') as HTMLElement;
    this.winnersViewHTMLSection = document.getElementById('winners-view') as HTMLElement;
    this.garageViewHTMLSection = document.getElementById('garage-view') as HTMLElement;

    this.prev = (document.getElementById('prev') as HTMLButtonElement);
    this.next = (document.getElementById('next') as HTMLButtonElement);

    this.garagePage = document.getElementById('garage-menu') as HTMLElement;
    this.winnersPage = document.getElementById('winners-menu') as HTMLElement;

    this.updateNextPrevButtonsState('garage');
  },

  updateNextPrevButtonsState(view: string): void {
    if (view === 'garage') {
      if (Store.carsPage * Store.pageGarageLimit < Number(Store.carsCount)) this.next.disabled = false;
      else this.next.disabled = true;

      if (Store.carsPage > 1) this.prev.disabled = false;
      else this.prev.disabled = true;
    }

    if (view === 'winners') {
      if (Store.winnersPage * Store.pageWinnersLimit < Number(Store.winnersCount)) this.next.disabled = false;
      else this.next.disabled = true;

      if (Store.winnersPage > 1) this.prev.disabled = false;
      else this.prev.disabled = true;
    }
  },

  switchView(view: PageView): void {
    if (view === 'garage') {
      this.garageViewHTMLSection.style.display = 'block';
      this.winnersViewHTMLSection.style.display = 'none';
      // this.garagePage.setAttribute('onclick', 'return false');
    }
    if (view === 'winners') {
      Store.updateStoreWinners();
      this.updateWinnersView();
      this.garageViewHTMLSection.style.display = 'none';
      this.winnersViewHTMLSection.style.display = 'block';
    }
  },

  async buttonNextPrevHandle(button: string): Promise<void> {
    const delta = button === 'prev' ? -1 : 1;
    if (Store.view === 'garage') {
      Store.carsPage += delta;
      await Store.updateStoreGarage();
      this.updateGarageView();
      this.updateNextPrevButtonsState('garage');
    }
    if (Store.view === 'winners') {
      Store.winnersPage += delta;
      await Store.updateStoreWinners();
      this.updateWinnersView();
      this.updateNextPrevButtonsState('winners');
    }
  },

  updateGarageView(): void {
    this.garageHTMLSection.innerHTML = PageGarage.renderGarage();
  },

  updateWinnersView(): void {
    this.winnersHTMLSection.innerHTML = PageWinners.renderWinners();
  },

  async reSortWinnersTable(sortBy: string): Promise<void> {
    Store.sortOrder = Store.sortOrder === 'asc' ? 'desc' : 'asc';
    Store.sortBy = sortBy;

    await Store.updateStoreWinners();
    this.updateWinnersView();
  },

};
