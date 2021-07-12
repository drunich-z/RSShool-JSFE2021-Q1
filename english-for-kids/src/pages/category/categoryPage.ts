import Store from '../../shared/store';

import View from '../../view';

export default {

  renderCategoryPage(): void {
    let result = '';
    const mainContainer = document.getElementById('main-container') as HTMLElement;
    result = '<div id="rating" class="rating "> СТРАНИЦА КАРТОЧЕК ... ЕЩЁ ДОДЕЛЫВАЮ ( </div>';
    result += View.renderTrainCards(Store.cards);
    result += '<div id="btns" class="rating none"> </div>';
    mainContainer.innerHTML = result;
  },

};
