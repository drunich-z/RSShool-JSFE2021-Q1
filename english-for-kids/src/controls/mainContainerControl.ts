import Model from '../model';
import Store from '../shared/store';
// import View from '../view';

function playAudio(src: string) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

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
  if (!card.classList.contains('translate') && !target.classList.contains('rotate')) {
    playAudio(`./assets/resource/${String(card.dataset.audiosrc)}`);
  }
}

async function handleRotateClick(target: HTMLElement): Promise<void> {
  const card = target.closest('.card') as HTMLElement;
  card.classList.add('translate');
  // не пойму как удалить листенер после того как мышь покинет карточку
  // можно ли так? )
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

    let target = (e.target as HTMLElement).closest('.main-card') as HTMLElement;
    if (target) handleCategoryLinkClick(target);

    target = (e.target as HTMLElement).closest('.card') as HTMLElement;
    if (target) handleCardClick(e.target as HTMLElement);

    if ((e.target as HTMLElement).classList.contains('rotate')
      && Store.applicationMode === 'train') handleRotateClick((e.target as HTMLElement));
  },

};
