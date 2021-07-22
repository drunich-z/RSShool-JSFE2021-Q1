import Model from '../model';
import Store from '../shared/store';
import Utils from '../shared/utils';
import BurgerControl from './burgerControl';

const handleDeleteCategory = async (target: HTMLElement) => {
  console.log(`deleteCategory-${target.dataset.id}`);
  await Model.deleteCategory(Number(target.dataset.id));
  BurgerControl.initBurgerLinks();
  window.location.hash = ' ';
  window.location.hash = 'admin';
};

const handleAddWordCategory = (target: HTMLElement) => {
  console.log(`add word-${target.dataset.id}`);
};

const handleUpdateCategory = (target: HTMLElement) => {
  console.log(`update category-${target.dataset.id}`);
};

const handleSaveUpdateCategory = (target: HTMLElement) => {
  console.log(`save update category-${target.dataset.id}`);
};

const handleCategoryWords = (target: HTMLElement) => {
  console.log(`shows words of category-${target.dataset.id}`);
};

const handleCreateCategory = (target: HTMLElement) => {
  console.log('create category');
};

export default {
  adminContainer: document.getElementById('main-container') as HTMLElement,

  initAdminContainerControls(): void {
    this.adminContainer = document.getElementById('main-container') as HTMLElement;
    this.adminContainer.addEventListener('click', this.adminHandler);
  },

  switchOffAdminContainerControls(): void {
    this.adminContainer = document.getElementById('main-container') as HTMLElement;
    this.adminContainer.removeEventListener('click', this.adminHandler);
  },

  adminHandler(e: Event): void {
    e.preventDefault();

    const eTarget = (e.target as HTMLElement);
    if (eTarget.classList.contains('btn-delete-category')) handleDeleteCategory(eTarget);
    if (eTarget.classList.contains('btn-add-word-category')) handleAddWordCategory(eTarget);
    if (eTarget.classList.contains('btn-update-category')) handleUpdateCategory(eTarget);
    if (eTarget.classList.contains('btn-save-category')) handleSaveUpdateCategory(eTarget);
    if (eTarget.classList.contains('category-words')) handleCategoryWords(eTarget);
    if (eTarget.classList.contains('new-category')) handleCreateCategory(eTarget);
  },

};
