import Model from '../model';
import Store from '../shared/store';
// import View from '../view';

async function handleCategoryLink(target: HTMLElement): Promise<void> {
  const prevActiveLink = document.querySelector('.burger-link_active') as HTMLElement;
  if (prevActiveLink) prevActiveLink.classList.remove('burger-link_active');
  (document.getElementById(`burger-link-${target.dataset.id}`) as HTMLElement).classList.add('burger-link_active');
  Store.activeCategory = { name: String(target.dataset.category), id: Number(target.dataset.id) };
  Store.cards = await Model.getCardsOfCategory(String(target.dataset.category));
  Store.page = 'category';
  window.location.hash = 'category';
}

export default {
  mainContainer: document.getElementById('main-container') as HTMLElement,

  async initMainContainerControls(): Promise<void> {
    this.mainContainer = document.getElementById('main-container') as HTMLElement;
    this.mainContainer.addEventListener('click', (e: Event) => this.mainHandler(e));
  },

  async mainHandler(e: Event): Promise<void> {
    e.preventDefault();

    const target = (e.target as HTMLElement).closest('.main-card') as HTMLElement;
    if (target) handleCategoryLink(target);
  },

};
