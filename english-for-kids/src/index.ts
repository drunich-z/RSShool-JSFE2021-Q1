import './styles/styles.scss';
import './shared/types';
import View from './view';
import Router from './router';
import Controller from './contoller';
import Store from './shared/store';

// alert('Постараюсь доделать таск до конца кроссчека.');
await Store.InitStore();
await View.renderBaseTemplate();
Router.init();
Controller.initControlls();
