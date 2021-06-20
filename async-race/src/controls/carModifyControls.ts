import Model from '../model';
import PageControls from './pageControls';
import Store from '../shared/store';

const DEFAULT_CAR_COLOR = '#ffffff';

export default {
  inputUpdateName: document.getElementById('update-name') as HTMLInputElement,
  inputUpdateColor: document.getElementById('update-color') as HTMLInputElement,
  submitUpdateButton: document.getElementById('update-submit') as HTMLButtonElement,
  submitUpdate: document.getElementById('update') as HTMLFormElement,

  inputCreateName: document.getElementById('create-name') as HTMLInputElement,
  inputCreateColor: document.getElementById('create-color') as HTMLInputElement,
  submitCreateButton: document.getElementById('create-submit') as HTMLButtonElement,
  submitCreate: document.getElementById('create') as HTMLFormElement,

  init(): void {
    this.inputUpdateName = document.getElementById('update-name') as HTMLInputElement;
    this.inputUpdateColor = document.getElementById('update-color') as HTMLInputElement;
    this.submitUpdateButton = document.getElementById('update-submit') as HTMLButtonElement;
    this.submitUpdate = document.getElementById('update') as HTMLFormElement;

    this.inputCreateName = document.getElementById('create-name') as HTMLInputElement;
    this.inputCreateColor = document.getElementById('create-color') as HTMLInputElement;
    this.submitCreateButton = document.getElementById('create-submit') as HTMLButtonElement;
    this.submitCreate = document.getElementById('create') as HTMLFormElement;
  },

  async listenCreateCar(): Promise<void> {
    (this.submitCreate as HTMLElement).addEventListener('submit', async (event) => {
      event.preventDefault();
      const car: CarCreate = {
        name: this.inputCreateName.value,
        color: this.inputCreateColor.value,
      };
      await Model.createCar(car);
      await Store.updateStoreGarage();
      PageControls.updateNextPrevButtonsState('garage');
      PageControls.updateGarageView();
      this.inputCreateName.value = '';
      this.inputCreateColor.value = DEFAULT_CAR_COLOR;
    });
  },

  async listenUpdateCar(): Promise<void> {
    (this.submitUpdate as HTMLElement).addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!Store.selectedCar.id) return;
      const updateBody = {
        name: this.inputUpdateName.value,
        color: this.inputUpdateColor.value,
      };
      await Model.updateCar(Store.selectedCar.id, updateBody);
      await Store.updateStoreGarage();
      PageControls.updateNextPrevButtonsState('garage');
      PageControls.updateGarageView();
      this.inputUpdateName.value = '';
      this.inputUpdateColor.value = DEFAULT_CAR_COLOR;
      Store.selectedCar = { name: '', color: '', id: 0 };
      this.setUpdateControlsEnable(false);
    });
  },

  setUpdateControlsEnable(value: boolean): void {
    this.inputUpdateName.disabled = !value;
    this.inputUpdateColor.disabled = !value;
    this.submitUpdateButton.disabled = !value;
  },

};
