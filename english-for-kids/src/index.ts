import './styles/styles.scss';
import './shared/types';
import View from './view';
import Router from './router';
import Controller from './contoller';
import Store from './shared/store';
import { Popup } from './components/popup/popup';

// alert('Постараюсь доделать таск до конца кроссчека.');
await Store.InitStore();
await View.renderBaseTemplate();
Router.init();
Controller.initControlls();
// const message = new Popup('Доброго дня! Закончу сегодня в 22:00 UTC. Спасибо)');
// message.show();
