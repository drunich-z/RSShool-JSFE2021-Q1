import Model from '../model';
import Store from '../shared/store';
import Utils from '../shared/utils';
import CarModifyControls from './carModifyControls';
import PageControls from './pageControls';

async function startDriving(id: number, startButton: HTMLButtonElement):
Promise <{ success: boolean, id: number, time:number }> {
  startButton.disabled = true;
  startButton.classList.toggle('enabling', true);

  const { velocity, distance } = await Model.startEngine(id);
  const time = Math.round(distance / velocity);

  startButton.classList.toggle('enabling', false);
  const stopButton = document.getElementById(`stop-engine-car-${id}`);
  (stopButton as HTMLButtonElement).disabled = false;

  const car = document.getElementById(`car-${id}`);
  const flag = document.getElementById(`flag-${id}`);
  if (car === null || flag === null) return { success: false, id: 0, time: 0 };
  const htmlDistance = Math.floor(Utils.getDistanceBetweenElements(car, flag));

  Store.setForceStopFlag(id, false);
  Store.animation[id] = Utils.animation(car, htmlDistance, time);

  const { success } = await Model.drive(id);
  if (!success) {
    window.cancelAnimationFrame(Store.animation[id].id);
    Store.setForceStopFlag(id, true);
  }

  return { success, id, time };
}

async function stopDriving(id: number, stopButton: HTMLButtonElement): Promise<void> {
  const startButton = (document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement);
  if (!stopButton || !startButton) return;

  stopButton.disabled = true;
  stopButton.classList.toggle('enabling', true);

  Store.setForceStopFlag(id, true);
  if (Store.animation[id]) window.cancelAnimationFrame(Store.animation[id].id);
  const car = document.getElementById(`car-${id}`);
  if (car) car.style.transform = 'translateX(0)';
  await Model.stopEngine(id);

  stopButton.classList.toggle('enabling', false);
  stopButton.disabled = false;
  startButton.classList.toggle('enabling', false);
  startButton.disabled = false;
}

export default {
  async carStartDrive(startButton: HTMLButtonElement): Promise < { success: boolean, id: number, time: number } > {
    if (startButton === null) return { success: false, id: 0, time: 100 };
    const id = startButton.id.split('start-engine-car-')[1];
    const result = await startDriving(Number(id), startButton);
    return result;
  },

  carStopDrive(stopButton: HTMLButtonElement): void {
    if (!stopButton) return;
    const id = stopButton.id.split('stop-engine-car-')[1];
    stopDriving(Number(id), stopButton);
  },

  async selectButtonHandle(selectButton: HTMLButtonElement): Promise<void> {
    if (!selectButton) return;
    const id = Number(selectButton.id.split('select-car-')[1]);
    Store.selectedCar = (await Model.getCar(id));

    CarModifyControls.setUpdateControlsEnable(true);
    (CarModifyControls.inputUpdateName as HTMLInputElement).value = Store.selectedCar.name;
    (CarModifyControls.inputUpdateColor as HTMLInputElement).value = Store.selectedCar.color;
  },

  async removeButtonHandle(removeButton: HTMLButtonElement): Promise<void> {
    if (!removeButton) return;
    const id = Number(removeButton.id.split('remove-car-')[1]);
    await Model.deleteCar(id);
    await Model.deleteWinner(id);
    await Store.updateStoreGarage();
    await Store.updateStoreWinners();
    PageControls.updateNextPrevButtonsState('garage');
    PageControls.updateNextPrevButtonsState('winners');
    PageControls.updateGarageView();
  },

};
