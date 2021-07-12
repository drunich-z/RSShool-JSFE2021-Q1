import Model from '../model';
// import './types';

export default {
  async initStatistics(): Promise<CardLocalForStatistics[]> {
    const result = [];
    const gameCards = await Model.getAllCards();
    const obj = {
      word: '',
      translation: '',
      category: { name: '', id: 0 },
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
  },

  // переделаю.
  async getFirstCardOfEachCategory(): Promise<CardLocal[]> {
    const result: CardLocal[] = [];
    const cardsCategories = await Model.getCategories();
    [result[0]] = await Model.getCardsOfCategory(cardsCategories[0].name);
    [result[1]] = await Model.getCardsOfCategory(cardsCategories[1].name);
    [result[2]] = await Model.getCardsOfCategory(cardsCategories[2].name);
    [result[3]] = await Model.getCardsOfCategory(cardsCategories[3].name);
    [result[4]] = await Model.getCardsOfCategory(cardsCategories[4].name);
    [result[5]] = await Model.getCardsOfCategory(cardsCategories[5].name);
    [result[6]] = await Model.getCardsOfCategory(cardsCategories[6].name);
    [result[7]] = await Model.getCardsOfCategory(cardsCategories[7].name);

    // замыкание осуществить
    // cardsCategories.forEach(async (item) => {
    //   [tmp] = await Model.getCardsOfCategory(item.name);
    //   // console.log(tmp);
    //   result.push(item.name);
    // });
    // console.log(result);
    return result;
  },

};
