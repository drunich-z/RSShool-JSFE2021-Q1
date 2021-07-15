type PageView = 'main' | 'category' | 'statistics';

type ApplicationMode = 'train' | 'game';

type Card = {
  word: string,
  translation: string,
  category: Category,
};

type JsonCard = {
  word: string,
  translation: string,
  image: string,
  audio: string
  category: string,
};

type CardLocal = {
  word: string,
  translation: string,
  image: string,
  audio: string
  category: Category,
};

type CardLocalForStatistics = {
  word: string,
  translation: string,
  category: Category,
  trainClicks: number,
  gameCorrectClicks: number,
  gameErrorClicks: number,
  gameCorrectPercent: number
};

type Category = {
  id: number
  name: string,
  description: string,
};
