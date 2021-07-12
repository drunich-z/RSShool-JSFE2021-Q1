import Model from '../model';
import './types';
import Utils from './utils';

const categories: Category[] = await Model.getCategories();
const activeCategory: Category = { name: '', id: -1 };
const cards: CardLocal[] = [];
const cardsForMainPage: CardLocal[] = [];
const page = 'main' as PageView;
const applicationMode = 'train' as ApplicationMode;
const statistics: CardLocalForStatistics[] = [];

// async function initStatistics(): Promise<CardLocalForStatistics[]> {
//   const result = [];
//   const gameCards = await Model.getAllCards();
//   const obj = {
//     word: '',
//     translation: '',
//     category: '',
//     trainClicks: 0,
//     gameCorrectClicks: 0,
//     gameErrorClicks: 0,
//     gameCorrectPercent: 0,
//   };
//   for (let i = 0; i < gameCards.length; i++) {
//     obj.word = gameCards[i].word;
//     obj.translation = gameCards[i].translation;
//     obj.category = gameCards[i].category;
//     result.push(obj);
//   }
//   return result;
// }

export default {
  categories,
  activeCategory,
  cards,
  cardsForMainPage,
  page,
  applicationMode,
  statistics,

  async statInit(): Promise<void> {
    const res = Model.getStatistics();
    if (res.length === 0) this.statistics = await Utils.initStatistics();
    else this.statistics = res;
  },

  async tempInitStore(): Promise<void> {
    this.categories = await Model.getCategories();
    [this.activeCategory] = this.categories;
    this.cards = await Model.getCardsOfCategory(this.activeCategory.name);

    this.cardsForMainPage = await Utils.getFirstCardOfEachCategory();
    this.page = 'main';
    this.applicationMode = 'train';
  },

};
