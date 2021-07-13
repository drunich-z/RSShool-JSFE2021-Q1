import Model from '../model';
import './types';
import Utils from './utils';

const categories: Category[] = await Model.getCategories();
const activeCategory: Category = { name: '', id: -1 };
const cards: CardLocal[] = [];
const cardsForGame: CardLocal[] = [];
const cardsForMainPage: CardLocal[] = [];
const page = 'main' as PageView;
const applicationMode = 'train' as ApplicationMode;
const statistics: CardLocalForStatistics[] = [];
const gameErrors = 0;
const totalNumberOfGameWords = 0;
const totalNumberOfCorrectGameWords = 0;
const activeGame = false as boolean;

export default {
  categories,
  activeCategory,
  cards,
  cardsForMainPage,
  page,
  applicationMode,
  statistics,
  gameErrors,
  cardsForGame,
  totalNumberOfGameWords,
  totalNumberOfCorrectGameWords,
  activeGame,

  async statInit(): Promise<void> {
    const res = Model.getStatistics();
    if (res.length === 0) this.statistics = await Utils.initStatistics();
    else this.statistics = res;
  },

  async tempInitStore(): Promise<void> {
    this.categories = await Model.getCategories();
    [this.activeCategory] = this.categories;
    this.cards = await Model.getCardsOfCategory(this.activeCategory.name);
    this.cardsForGame = this.cards.slice();

    this.cardsForMainPage = await Utils.getFirstCardOfEachCategory();
    this.page = 'main';
    this.applicationMode = 'train';
  },

  initGame():void {
    this.gameErrors = 0;
    this.cardsForGame = this.cards.slice();
    this.cardsForGame = Utils.shuffle(this.cardsForGame);
    this.totalNumberOfGameWords = this.cardsForGame.length;
    this.totalNumberOfCorrectGameWords = 0;
    this.activeGame = true;
  },

};
