import BurgerControl from './controls/burgerControl';
import MainContainerControl from './controls/mainContainerControl';
import SwitchModeControl from './controls/switchModeControl';
import AdminControl from './controls/adminControl';
import CategoryPage from './pages/game-mode/gameCardsPage';
import MainPage from './pages/main/mainCategoryPage';
import AdminPage from './pages/admin/adminCategoryPage';
import Store from './shared/store';
import Utils from './shared/utils';

export default {
  async mainRoute(): Promise<void> {
    const prevActiveLink = document.querySelector('.burger-link_active') as HTMLElement;
    if (prevActiveLink) prevActiveLink.classList.remove('burger-link_active');
    Store.activeCategory = { name: '', id: -1, description: '' };
    Store.cards = [];
    Store.page = 'main';
    Store.cardsForCategories = await Utils.getCardsForCategories();
    MainPage.renderMainPage();
    const mainLink = (document.getElementById('burger-link-main') as HTMLElement);
    if (mainLink) mainLink.classList.add('burger-link_active');
    MainContainerControl.switchOffMainContainerControls();
    MainContainerControl.initMainContainerControls();
  },

  async categoryRoute(): Promise<void> {
    CategoryPage.renderGameCardsPage();
    MainContainerControl.switchOffMainContainerControls();
    MainContainerControl.initMainContainerControls();
  },

  async statisticsRoute(): Promise<void> {
    const mainContainer = document.getElementById('main-container') as HTMLElement;
    mainContainer.innerHTML = 'СТРАНИЦА СТАТИСТИКИ <br> НЕ ГОТОВА (';
    MainContainerControl.switchOffMainContainerControls();
  },

  async adminRoute(): Promise<void> {
    AdminPage.renderAdminPage();
    MainContainerControl.switchOffMainContainerControls();
    AdminControl.initAdminControls();
  },

  async initControlls(): Promise<void> {
    BurgerControl.initBurger();
    SwitchModeControl.initSwitch();
    // MainContainerControl.initMainContainerControls();
    // MainContainerControl.switchOffMainContainerControls();
  },

};
