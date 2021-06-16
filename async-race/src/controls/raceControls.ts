import Model from '../model';
import Store from '../shared/store';
import Utils from '../shared/utils';
import CarControls from './carControls';
import PageControls from './pageControls';

async function raceAll(promises: any, ids: any): Promise<any> {
  const { success, id, time } = await Promise.race(promises);

  if (!success) {
    const failedIndex = ids.failedIndex((i:any) => i === id);
    const restPromises = [...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1, promises.length)];
    const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
    return raceAll(restPromises, restIds);
  }

  return { ...Store.cars.find((car) => car.id === id), time: +(time / 1000).toFixed(2) };
}

async function race(action: any): Promise<any> {
  const promises = Store.cars.map(({ id }) => {
    const startButton = document.getElementById(`start-engine-car-${id}`);
    return action(startButton);
  });

  console.log(promises);
  const winner = await raceAll(promises, Store.cars.map((car) => car.id));
  console.log(winner);

  return winner;
}

export default {
  async generateExtraCarsHandle(generateButton: HTMLButtonElement): Promise<void> {
    if (!generateButton) return;
    generateButton.disabled = true;
    const cars = Utils.generateRandomCars();
    await Promise.all(cars.map(async (item) => Model.createCar(item)));
    await Store.updateStoreGarage();
    PageControls.updateGarageView();
    generateButton.disabled = false;
  },

  async raceHandle(raceButton: HTMLButtonElement): Promise<void> {
    if (!raceButton) return;
    raceButton.disabled = true;
    const winner = await race(CarControls.carStartDrive);
    await Model.saveWinner(winner);
    const message = document.getElementById('message');
    if (!message) return;
    message.innerHTML = `${winner.name} went first (${winner.time}s)!`;
    message.classList.toggle('visible', true);
    (document.getElementById('race') as HTMLButtonElement).disabled = true;
    (document.getElementById('reset') as HTMLButtonElement).disabled = false;
  },

  async resetHandle(resetButton: HTMLButtonElement): Promise<void> {
    if (!resetButton) return;
    resetButton.disabled = true;
    Store.cars.map(({ id }) => {
      const stopButton = (document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement);
      return CarControls.carStopDrive(stopButton);
    });
    const message = document.getElementById('message');
    if (!message) return;
    message.classList.toggle('visible', false);
    (document.getElementById('race') as HTMLButtonElement).disabled = false;
    (document.getElementById('reset') as HTMLButtonElement).disabled = true;
  },

};
