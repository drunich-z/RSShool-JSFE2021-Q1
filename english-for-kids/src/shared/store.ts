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
const wordsCounter = 0;
const correctWordsCounter = 0;
const errorWordsCounter = 0;
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
  wordsCounter,
  correctWordsCounter,
  errorWordsCounter,
  activeGame,

  async statInit(): Promise<void> {
    // const res = Model.getStatistics();
    // if (res.length === 0) {
    //   this.statistics = await Utils.initStatistics();
    //   Model.initStatistics(this.statistics);
    // } else this.statistics = res;
    // console.log(this.statistics);
  },

  async tempInitStore(): Promise<void> {
    this.categories = await Model.getCategories();
    [this.activeCategory] = this.categories;
    this.cards = await Model.getCardsOfCategory(this.activeCategory.name);
    this.cardsForGame = this.cards.slice();
    this.cardsForMainPage = await Utils.getFirstCardOfEachCategory();
    this.page = 'main';
    this.applicationMode = 'train';
    // this.statInit();
  },

  initGameState(toggle = true):void {
    this.gameErrors = 0;
    this.cardsForGame = this.cards.slice();
    this.cardsForGame = Utils.shuffle(this.cardsForGame);
    this.wordsCounter = this.cardsForGame.length;
    this.correctWordsCounter = 0;
    this.errorWordsCounter = 0;
    this.activeGame = toggle;
  },

};
