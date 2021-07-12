import BurgerControl from './controls/burgerControl';
import MainContainerControl from './controls/mainContainerControl';
import SwitchModeControl from './controls/switchModeControl';
import CategoryPage from './pages/category/categoryPage';
import MainPage from './pages/main/mainPage';
import View from './view';

export default {
  async mainRoute(): Promise<void> {
    MainPage.renderMainPage();
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
