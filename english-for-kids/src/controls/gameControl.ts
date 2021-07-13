// import Model from '../model';
// import Store from '../shared/store';
// // import View from '../view';

// export default {
//   mainContainer: document.getElementById('main-container') as HTMLElement,
//   rating: document.getElementById('rating') as HTMLElement,
//   btnStart: document.getElementById('button-start') as HTMLElement,

//   async initGameControls(): Promise<void> {
//     this.mainContainer = document.getElementById('main-container') as HTMLElement;
//     this.rating = document.getElementById('rating') as HTMLElement;
//     this.btnStart = document.getElementById('button-start') as HTMLElement;
//     console.log(this.mainContainer);
//     console.log(this.rating);
//     console.log(this.btnStart);
    

//     // this.btnStart.addEventListener('click', (e: Event) => this.gameBtnHandler(e));
//     this.btnStart.addEventListener('click', () => { console.log('kk'); });
//     console.log('btnStart after');
//   },

//   async gameBtnHandler(e: Event): Promise<void> {
//     e.preventDefault();
//     console.log('btnStart handler');
    

//     if (!this.btnStart.classList.contains('.repeat')) {
//       this.btnStart.classList.add('repeat');
//       Store.initGame();
//     }
//   },

// };
