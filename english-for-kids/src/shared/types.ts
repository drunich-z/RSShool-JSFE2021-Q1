type PageView = 'main' | 'category' | 'statistics';

type ApplicationMode = 'train' | 'game';

type Card = {
  word: string,
  translation: string,
  category: string,
};

type CardLocal = {
  word: string,
  translation: string,
  image: string,
  audio: string
  category: string,
};

type CardLocalForStatistics = {
  word: string,
  translation: string,
  category: string,
  trainClicks: number,
  gameCorrectClicks: number,
  gameErrorClicks: number,
  gameCorrectPercent: number
};

type Category = {
  name: string,
  id: number,
};
