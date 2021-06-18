import Model from '../model';
import Store from '../shared/store';
import Utils from '../shared/utils';
import CarControls from './carControls';
import PageControls from './pageControls';

async function raceAll(promises: Promise<{ success: boolean, id: number, time: number }>[], ids: number[]):
Promise<{ name: string, color: string, id: number, time: number, }> {
  const result = await Promise.race(promises);
  if (Store.getForceStopFlag(result.id)) result.success = false;

  if (!result.success) {
    const failedIndex = ids.findIndex((i: number) => i === result.id);
    const restPromises = [...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1, promises.length)];
    const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];

    if (restIds.length === 0) {
      return {
        name: 'NOBODY', color: '', id: 0, time: 0,
      };
    }

    return raceAll(restPromises, restIds);
  }

  const yaUstalOtLint = Store.cars.find((car) => car.id === result.id) as CarPlus;
  return { ...yaUstalOtLint, time: +(result.time / 1000).toFixed(2) };
}

// не знаю будешь ли всё читать, но если до этого места доберешься...
// any нет, но описание типов аргументов и возвращаемых значений
// функции - 3 строки. Это нормально?
async function race(action: (startButton: HTMLButtonElement) =>
Promise<{ success: boolean; id: number; time: number; }>) :
  Promise< { name: string, color: string, id: number, time: number } > {
  const promises = Store.cars.map(({ id }) => {
    const startButton = document.getElementById(`start-engine-car-${id}`);
    return action(startButton as HTMLButtonElement);
  });
  const winner = await raceAll(promises, Store.cars.map((car) => car.id));
  return winner;
}

// async function startRaceAndGetWinner() {
//   let thereIsNoWinnerYet = true;
//   let winner = { success: false, id: 0, time: 0 };
//   const promises = Store.cars.map(async (car) => {
//     const startButton = document.getElementById(`start-engine-car-${car.id}`) as HTMLButtonElement;
//     const result = await CarControls.carStartDrive(startButton);

//     if (result.success && thereIsNoWinnerYet && !Store.getForceStopFlag(car.id)) {
//       winner = result;
//       thereIsNoWinnerYet = false;
//     }
//     return winner;
//   });

//   await Promise.all(promises);

//   if (winner.success) {
//     const curCar = Store.cars.find((car) => car.id === winner.id);
//     if (curCar !== undefined) return { ...curCar, time: +(winner.time / 1000).toFixed(2), success: true };
//   }
//   return {
//     ...winner, name: 'NOBODY', color: '', forceStop: false,
//   };
// }

export default {
  raceButton: (document.getElementById('race') as HTMLButtonElement),
  resetButton: (document.getElementById('reset') as HTMLButtonElement),
  generateButton: (document.getElementById('generate') as HTMLButtonElement),
  messageContainer: (document.getElementById('message-container') as HTMLElement),
  winMessage: (document.getElementById('message') as HTMLElement),

  init(): void {
    this.raceButton = (document.getElementById('race') as HTMLButtonElement);
    this.resetButton = (document.getElementById('reset') as HTMLButtonElement);
    this.generateButton = (document.getElementById('generate') as HTMLButtonElement);
    this.messageContainer = (document.getElementById('message-container') as HTMLElement);
    this.winMessage = (document.getElementById('message') as HTMLElement);
  },

  async generateExtraCarsHandle(generateButton: HTMLButtonElement): Promise<void> {
    if (!generateButton) return;
    generateButton.disabled = true;
    const cars = Utils.generateRandomCars();
    await Promise.all(cars.map(async (item) => Model.createCar(item)));
    await Store.updateStoreGarage();
    PageControls.updateGarageView();
    PageControls.updateNextPrevButtonsState('garage');
    generateButton.disabled = false;
  },

  async raceHandle(raceButton: HTMLButtonElement): Promise<void> {
    if (!raceButton) return;
    raceButton.disabled = true;

    const winner = await race(CarControls.carStartDrive);
    if (winner.id) await Model.saveWinner({ id: winner.id, time: winner.time });

    this.winMessage.innerHTML = `${winner.name} went first (${winner.time}s)!`;
    this.winMessage.classList.toggle('visible', true);
    this.messageContainer.classList.remove('hidden');
    Store.updateStoreWinners();
    PageControls.updateWinnersView();

    this.raceButton.disabled = true;
    this.resetButton.disabled = false;
  },

  async resetHandle(resetButton: HTMLButtonElement): Promise<void> {
    if (!resetButton) return;
    resetButton.disabled = true;
    Store.cars.map(({ id }) => {
      const stopButton = (document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement);
      return CarControls.carStopDrive(stopButton);
    });
    this.winMessage.classList.toggle('visible', false);
    this.messageContainer.classList.add('hidden');
    this.raceButton.disabled = false;
    this.resetButton.disabled = true;
  },

};
