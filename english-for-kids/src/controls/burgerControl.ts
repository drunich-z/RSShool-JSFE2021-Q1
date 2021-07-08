import Model from '../model';
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

};
