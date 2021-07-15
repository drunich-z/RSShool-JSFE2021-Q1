import Model from '../model';
import Store from '../shared/store';
import View from '../view';

export default {
  burgerBtn: document.getElementById('burger-menu_button') as HTMLElement,
  burgerMenu: document.getElementById('burger-menu') as HTMLElement,
  burgerLinks: document.getElementById('burger-links') as HTMLElement,
  coverElement: document.getElementById('cover') as HTMLElement,
  bodyElement: document.getElementById('body') as HTMLElement,

  async initBurger(): Promise<void> {
    this.burgerBtn = document.getElementById('burger-menu_button') as HTMLElement;
    this.burgerMenu = document.getElementById('burger-menu') as HTMLElement;
    this.coverElement = document.getElementById('cover') as HTMLElement;
    this.bodyElement = document.getElementById('body') as HTMLElement;
    this.burgerLinks = document.getElementById('burger-links') as HTMLElement;

    const categoriesForRender = await Model.getCategories();
    this.burgerLinks.innerHTML = View.renderBurger(categoriesForRender);

    this.burgerBtn.addEventListener('click', (e: Event) => this.burgerBtnHandler(e));
    this.coverElement.addEventListener('click', this.handleBurger.bind(this));
    this.burgerLinks.addEventListener('click', (e: Event) => this.handleBurgerLinks(e));
  },

  burgerBtnHandler(e: Event): void {
    e.preventDefault();
    this.handleBurger();
  },

  handleBurger(): void {
    this.bodyElement.classList.toggle('notScrollable');
    this.coverElement.classList.toggle('hidden');
    this.burgerMenu.classList.toggle('burger-menu_active');
  },

  async handleBurgerLinks(e: Event): Promise<void> {
    e.preventDefault();
    const target = e.target as HTMLElement;
    if (target.classList.contains('burger-link') && !target.classList.contains('burger-link_active')) {
      Store.activeGame = false;
      const prevActiveLink = document.querySelector('.burger-link_active') as HTMLElement;
      if (prevActiveLink) prevActiveLink.classList.remove('burger-link_active');
      target.classList.add('burger-link_active');
      if (target.dataset.type === 'main') {
        Store.page = 'main';
        window.location.hash = 'main';
        this.handleBurger();
      }
      if (target.dataset.type === 'category') {
        Store.page = 'category';
        Store.activeCategory.name = target.dataset.link as string;
        Store.cards = await Model.getCardsOfCategory(Store.activeCategory.name);
        window.location.hash = ' ';
        window.location.hash = 'category';
        this.handleBurger();
      }
      if (target.dataset.type === 'statistics') {
        Store.page = 'statistics';
        window.location.hash = 'statistics';
        this.handleBurger();
      }
    }
  },

};
