import Store from '../../shared/store';

import View from '../../view';

export default {

  renderCategoryPage(): void {
    const mainContainer = document.getElementById('main-container') as HTMLElement;
    mainContainer.innerHTML = View.renderCardsForCategoryPage(Store.cards, Store.applicationMode);
  },

};
