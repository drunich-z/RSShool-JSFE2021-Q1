import './styles/styles.scss';
import './shared/types';
import View from './view';
import Router from './router';
import Controller from './contoller';

await View.renderBaseTemplate();
Router.init();
Controller.initControlls();
