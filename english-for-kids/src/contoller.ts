import BurgerControl from './controls/burgerControl';
import MainContainerControl from './controls/mainContainerControl';
import SwitchModeControl from './controls/switchModeControl';
import CategoryPage from './pages/category/categoryPage';
import MainPage from './pages/main/mainPage';
import Store from './shared/store';

export default {
  async mainRoute(): Promise<void> {
    const prevActiveLink = document.querySelector('.burger-link_active') as HTMLElement;
    if (prevActiveLink) prevActiveLink.classList.remove('burger-link_active');
    Store.activeCategory = { name: '', id: -1, description: '' };
    Store.cards = [];
    Store.page = 'main';
    MainPage.renderMainPage();
    const mainLink = (document.getElementById('burger-link-main') as HTMLElement);
    if (mainLink) mainLink.classList.add('burger-link_active');
  },

  async categoryRoute(): Promise<void> {
    CategoryPage.renderCategoryPage();
  },

  async statisticsRoute(): Promise<void> {
    const mainContainer = document.getElementById('main-container') as HTMLElement;
    mainContainer.innerHTML = 'СТРАНИЦА СТАТИСТИКИ <br> ЕЩЁ ДОДЕЛЫВАЮ (';
  },

  async initControlls(): Promise<void> {
    BurgerControl.initBurger();
    SwitchModeControl.initSwitch();
    MainContainerControl.initMainContainerControls();
  },

};
