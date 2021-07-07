import BurgerControl from './controls/burgerControl';
import SwitchModeControl from './controls/switchModeControl';
import View from './view';

export default {
  async mainRoute(): Promise<void> {
    console.log('main');
  },

  async categoryRoute(): Promise<void> {
    console.log('category');
  },

  async statisticsRoute(): Promise<void> {
    console.log('statistic');
  },

  async initControlls(): Promise<void> {
    BurgerControl.initBurger();
    SwitchModeControl.initSwitch();
  },

};
