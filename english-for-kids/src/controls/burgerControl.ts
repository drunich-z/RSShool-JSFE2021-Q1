import Model from '../model';
import Store from '../shared/store';
import View from '../view';
import MainContainerControl from './mainContainerControl';
import { Popup } from '../components/popup/popup';

export default {
  burgerBtn: document.getElementById('burger-menu_button') as HTMLElement,
  burgerMenu: document.getElementById('burger-menu') as HTMLElement,
  burgerLinks: document.getElementById('burger-links') as HTMLElement,
  coverElement: document.getElementById('cover') as HTMLElement,
  bodyElement: document.getElementById('body') as HTMLElement,
  adminPanel: document.getElementById('burger-link-admin') as HTMLElement,
  login: document.getElementById('burger-link-login') as HTMLElement,
  logout: document.getElementById('burger-link-logout') as HTMLElement,

  async initBurger(): Promise<void> {
    this.burgerBtn = document.getElementById('burger-menu_button') as HTMLElement;
    this.burgerMenu = document.getElementById('burger-menu') as HTMLElement;
    this.coverElement = document.getElementById('cover') as HTMLElement;
    this.bodyElement = document.getElementById('body') as HTMLElement;
    this.burgerLinks = document.getElementById('burger-links') as HTMLElement;

    const categoriesForRender = await Model.getCategories();
    this.burgerLinks.innerHTML = View.renderBurger(categoriesForRender);

    this.adminPanel = document.getElementById('burger-link-admin') as HTMLElement;
    this.login = document.getElementById('burger-link-login') as HTMLElement;
    this.logout = document.getElementById('burger-link-logout') as HTMLElement;

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
      if (prevActiveLink
        && !target.classList.contains('burger-link-login')
        && !target.classList.contains('burger-link-logout')) prevActiveLink.classList.remove('burger-link_active');
      if (!target.classList.contains('burger-link-login')
        && !target.classList.contains('burger-link-logout')) target.classList.add('burger-link_active');
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
      if (target.dataset.type === 'login') {
        this.handleLogin();
      }
      if (target.dataset.type === 'logout') {
        this.handleLogout();
      }

      if (target.dataset.type === 'admin') {
        Store.page = 'admin';
        window.location.hash = 'admin';
        this.handleBurger();
      }
    }
  },

  handleLogout():void {
    Store.authorized = false;
    this.adminPanel.classList.toggle('hidden');
    this.logout.classList.toggle('hidden');
    this.login.classList.toggle('hidden');
    this.handleBurger();
    Store.page = 'main';
    window.location.hash = 'main';
  },

  handleLogin():void {
    MainContainerControl.switchOffMainContainerControls();
    const loginForm = document.createElement('div');
    loginForm.innerHTML = View.renderLoginForm();
    this.bodyElement.append(loginForm);
    const okBtn = document.getElementById('btnOk') as HTMLButtonElement;
    const cancelBtn = document.getElementById('btnCancel') as HTMLButtonElement;
    const loginInput = document.getElementById('input-login') as HTMLInputElement;
    const passwordInput = document.getElementById('input-pass') as HTMLInputElement;
    this.burgerMenu.classList.toggle('burger-menu_active');

    const removeForm = () => {
      this.bodyElement.classList.toggle('notScrollable');
      this.coverElement.classList.toggle('hidden');
      loginForm.remove();
      MainContainerControl.initMainContainerControls();
    };

    // потом(наверное) на стороне сервера сделаю
    const authorize = (): boolean => {
      if (loginInput.value === 'admin' && passwordInput.value === 'admin') return true;
      return false;
    };

    okBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (authorize()) {
        Store.authorized = true;
        this.adminPanel.classList.toggle('hidden');
        this.logout.classList.toggle('hidden');
        this.login.classList.toggle('hidden');
        removeForm();
        return;
      }
      const popup = new Popup('login and password are not correct', false);
      popup.show();
    });

    cancelBtn.addEventListener('click', (e) => {
      e.preventDefault();
      removeForm();
    });
  },

};
