import './shared/types';

const BASE = './assets/resource/data.json';
// const BASE = './data.json';

export default {

  async getCategories(): Promise<Category[]> {
    const response = await fetch(BASE);
    const [categories] = await response.json();

    return categories.map((item: string) => ({ id: categories.indexOf(item), name: item }));
  },

  async getCardsOfCategory(category: string): Promise<CardLocal[]> {
    const response = await fetch(BASE);
    const [categories, ...cards] = await response.json();
    const index = categories.indexOf(category);

    return cards[index].filter((item: any) => (item.category === category))
      .map((item:any) => ({
        word: item.word,
        translation: item.translation,
        image: item.image,
        audio: item.audioSrc,
        category: {
          name: item.category,
          id: categories.indexOf(category),
        },
      }));
  },

  async getAllCards(): Promise<CardLocal[]> {
    const response = await fetch(BASE);
    const [categories, ...cards] = await response.json();
    // console.log('All-cards', cards);
    return cards;
  },

  // ********************************************************************************

  updateStatistics(card: CardLocalForStatistics): void {
    const key = `EFK-${card.word}`;
    localStorage.setItem(key, JSON.stringify(card));
  },

  getStatistics(): CardLocalForStatistics[] {
    const result = [];
    const keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].indexOf('EFK-', 0) !== -1) result.push(JSON.parse(localStorage.getItem(keys[i]) as string));
    }
    return result;
  },

  clearStistics(): void {
    let tmpObj;
    const keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].indexOf('EFK-', 0) !== -1) {
        tmpObj = {
          ...JSON.parse(localStorage.getItem(keys[i]) as string),
          trainClicks: 0,
          gameCorrectClicks: 0,
          gameErrorClicks: 0,
          gameCorrectPercent: 0,
        };
        localStorage.setItem(keys[i], JSON.stringify(tmpObj));
      }
    }
  },

  deleteStistics(): void {
    const keys = Object.keys(localStorage);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i].indexOf('EFK-', 0) !== -1) localStorage.removeItem(keys[i]);
    }
  },

  initStatistics(cards: CardLocalForStatistics[]): void {
    let key;
    this.deleteStistics();
    for (let i = 0; i < cards.length; i++) {
      key = `EFK-${cards[i].word}`;
      localStorage.setItem(key, JSON.stringify(cards[i]));
    }
  },

};
