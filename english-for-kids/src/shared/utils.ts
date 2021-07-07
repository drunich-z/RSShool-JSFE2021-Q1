import Model from '../model';

export default {
  async initStatistics(): Promise<CardLocalForStatistics[]> {
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
  },
};
