import BurgerControl from './controls/burgerControl';
import SwitchModeControl from './controls/switchModeControl';
import CategoryPage from './pages/category/categoryPage';
import View from './view';

export default {
  async mainRoute(): Promise<void> {
    const mainContainer = document.getElementById('main-container') as HTMLElement;
    mainContainer.innerHTML = 'СТРАНИЦА КАТЕГОРИЙ (ОСНОВНАЯ) <br> ЕЩЁ ДОДЕЛЫВАЮ (';
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
  },

};
