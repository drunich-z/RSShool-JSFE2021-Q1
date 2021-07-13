import Model from '../model';
import Store from '../shared/store';
import Utils from '../shared/utils';

async function handleCategoryLinkClick(target: HTMLElement): Promise<void> {
  const prevActiveLink = document.querySelector('.burger-link_active') as HTMLElement;
  if (prevActiveLink) prevActiveLink.classList.remove('burger-link_active');
  (document.getElementById(`burger-link-${target.dataset.id}`) as HTMLElement).classList.add('burger-link_active');
  Store.activeCategory = { name: String(target.dataset.category), id: Number(target.dataset.id) };
  Store.cards = await Model.getCardsOfCategory(String(target.dataset.category));
  Store.page = 'category';
  window.location.hash = 'category';
}

async function handleCardClick(target: HTMLElement): Promise<void> {
  const card = target.closest('.card') as HTMLElement;
  if (!card.classList.contains('translate')
      && !target.classList.contains('rotate')
      && Store.applicationMode === 'train') {
    Utils.playAudio(`./assets/resource/${String(card.dataset.audiosrc)}`);
  }
}

async function handleRotateClick(target: HTMLElement): Promise<void> {
  const card = target.closest('.card') as HTMLElement;
  card.classList.add('translate');
  // не пойму как удалить листенер после того как мышь покинет карточку
  // можно ли так?
  card.addEventListener('mouseleave', () => {
    card.classList.remove('translate');
    card.removeEventListener('mouseleave', () => {
      card.classList.remove('translate');
    });
  });
}

export default {
  mainContainer: document.getElementById('main-container') as HTMLElement,

  async initMainContainerControls(): Promise<void> {
    this.mainContainer = document.getElementById('main-container') as HTMLElement;
    this.mainContainer.addEventListener('click', (e: Event) => this.mainHandler(e));
  },

  async mainHandler(e: Event): Promise<void> {
    e.preventDefault();

    const eTarget = (e.target as HTMLElement);

    let target = eTarget.closest('.main-card') as HTMLElement;
    if (target) handleCategoryLinkClick(target);

    target = eTarget.closest('.card') as HTMLElement;
    if (target) handleCardClick(e.target as HTMLElement);

    if (eTarget.classList.contains('rotate')
      && Store.applicationMode === 'train') handleRotateClick(eTarget);

    if (eTarget.classList.contains('btn') && Store.applicationMode === 'game') {
      if (!eTarget.classList.contains('repeat')) {
        Store.initGame();
        eTarget.classList.add('repeat');
      }
    }
  },

};
