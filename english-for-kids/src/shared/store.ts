import Model from '../model';
import './types';

const categories: Category[] = await Model.getCategories();
const activeCategory: Category = { name: '', id: -1 };
const cards: Card[] = [];
const page = 'main' as PageView;
const applicationMode = 'train' as ApplicationMode;
const statistics: CardLocalForStatistics[] = [];

async function initStatistics() {
  const result = [];
  const gameCards = await Model.getAllCards();
  const obj = {
    word: '',
    translation: '',
    category: '',
    trainClicks: 0,
    gameCorrectClicks: 0,
    gameErrorClicks: 0,
    gameCorrectPercent: 0,
  };
  for (let i = 0; i < gameCards.length; i++) {
    obj.word = gameCards[i].word;
    obj.translation = gameCards[i].translation;
    obj.category = gameCards[i].category;
    result.push(obj);
  }
  return result;
}

export default {
  categories,
  activeCategory,
  cards,
  page,
  applicationMode,
  statistics,

  async statInit(): Promise<void> {
    const res = Model.getStatistics();
    if (res.length === 0) this.statistics = await initStatistics();
    else this.statistics = res;
  },

};
