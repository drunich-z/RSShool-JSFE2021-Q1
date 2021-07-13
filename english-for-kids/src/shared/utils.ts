import Model from '../model';

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

  playAudio(src: string):void {
    const audio = new Audio();
    audio.src = src;
    audio.currentTime = 0;
    audio.play();
  },

  shuffle(arr: any[]): any[] {
    let j;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  createDOMElement(
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    innerText = '',
  ): HTMLElement {
    const element = document.createElement(tag);
    element.classList.add(...styles);
    element.innerHTML = innerText;
    return element;
  },

  popup(result: 'win' | 'lose', errors: number): void {
    let sound; let text; let picture;
    if (result === 'win') {
      sound = './assets/resource/control-audio/win.mp3';
      picture = './assets/resource/control-img/success.jpg';
      text = 'Win!!!';
    } else {
      sound = './assets/resource/control-audio/failure.mp3';
      picture = './assets/resource/control-img/failure.jpg';
      text = `Lose...(${errors} errors)`;
    }
    const innerText = `
      <div>${text}</div>
      <img src="${picture}" alt="game result">
    `;
    const body = document.getElementById('body') as HTMLElement;
    const cover = document.getElementById('cover') as HTMLElement;
    const popupMsg = this.createDOMElement('div', ['popup'], innerText);
    body.append(popupMsg);
    this.playAudio(sound);
    body.classList.toggle('notScrollable');
    cover.classList.toggle('hidden');

    setTimeout(() => {
      body.classList.toggle('notScrollable');
      cover.classList.toggle('hidden');
      body.removeChild(popupMsg);
    }, 3000);
  },

};
