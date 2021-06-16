import PageGarage from '../pages/garage/garage';
import PageWinners from '../pages/winners/winners';
import Store from '../shared/store';

export default {
  garageHTMLSection: document.getElementById('garage'),
  winnersHTMLSection: document.getElementById('winners-view'),
  winnersViewHTMLSection: document.getElementById('winners-view'),
  garageViewHTMLSection: document.getElementById('garage-view'),

  prev: document.getElementById('prev'),
  next: document.getElementById('next'),

  init(): void {
    this.garageHTMLSection = document.getElementById('garage');
    this.winnersHTMLSection = document.getElementById('winners-view');
    this.winnersViewHTMLSection = document.getElementById('winners-view');
    this.garageViewHTMLSection = document.getElementById('garage-view');

    this.prev = document.getElementById('prev');
    this.next = document.getElementById('next');

    this.updateNextPrevButtonsState('garage');
  },

  updateNextPrevButtonsState(view: string): void {
    if (view === 'garage') {
      if (Store.carsPage * Store.pageGarageLimit < Number(Store.carsCount)) {
        if (this.next) (this.next as HTMLButtonElement).disabled = false;
      } else if (this.next) (this.next as HTMLButtonElement).disabled = true;

      if (Store.carsPage > 1) {
        if (this.prev) (this.prev as HTMLButtonElement).disabled = false;
      } else if (this.prev) (this.prev as HTMLButtonElement).disabled = true;
    }

    if (view === 'winners') {
      if (Store.winnersPage * Store.pageWinnersLimit < Number(Store.winnersCount)) {
        if (this.next) (this.next as HTMLButtonElement).disabled = false;
      } else if (this.next) (this.next as HTMLButtonElement).disabled = true;

      if (Store.winnersPage > 1) {
        if (this.prev) (this.prev as HTMLButtonElement).disabled = false;
      } else if (this.prev) (this.prev as HTMLButtonElement).disabled = true;
    }
  },

  switchView(view: PageView): void {
    if (view === 'garage') {
      if (this.garageViewHTMLSection) this.garageViewHTMLSection.style.display = 'block';
      if (this.winnersViewHTMLSection) this.winnersViewHTMLSection.style.display = 'none';
    }
    if (view === 'winners') {
      if (this.garageViewHTMLSection) this.garageViewHTMLSection.style.display = 'none';
      if (this.winnersViewHTMLSection) this.winnersViewHTMLSection.style.display = 'block';
    }
  },

  async buttonNextPrevHandle(button: string): Promise<void> {
    const delta = button === 'prev' ? -1 : 1;
    if (Store.view === 'garage') {
      Store.carsPage += delta;
      await Store.updateStoreGarage();
      if (this.garageHTMLSection) this.garageHTMLSection.innerHTML = PageGarage.renderGarage();
      this.updateNextPrevButtonsState('garage');
    }
    if (Store.view === 'winners') {
      Store.winnersPage += delta;
      await Store.updateStoreWinners();
      if (this.winnersHTMLSection) this.winnersHTMLSection.innerHTML = PageWinners.renderWinners();
      this.updateNextPrevButtonsState('winners');
    }
  },

  updateGarageView(): void {
    if (this.garageHTMLSection) this.garageHTMLSection.innerHTML = PageGarage.renderGarage();
  },

  updateWinnersView(): void {
    if (this.winnersHTMLSection) this.winnersHTMLSection.innerHTML = PageWinners.renderWinners();
  },

  async reSortWinnersTable(sortBy: string): Promise<void> {
    Store.sortOrder = Store.sortOrder === 'asc' ? 'desc' : 'asc';
    Store.sortBy = sortBy;

    await Store.updateStoreWinners();
    this.updateWinnersView();
  },

};
