import Model from '../model';
import PageControls from './pageControls';
import Store from '../shared/store';

export default {
  inputUpdateName: document.getElementById('update-name'),
  inputUpdateColor: document.getElementById('update-color'),
  submitUpdateButton: document.getElementById('update-submit'),
  submitUpdate: document.getElementById('update'),

  inputCreateName: document.getElementById('create-name'),
  inputCreateColor: document.getElementById('create-color'),
  submitCreateButton: document.getElementById('create-submit'),
  submitCreate: document.getElementById('create'),

  init(): void {
    this.inputUpdateName = document.getElementById('update-name');
    this.inputUpdateColor = document.getElementById('update-color');
    this.submitUpdateButton = document.getElementById('update-submit');
    this.submitUpdate = document.getElementById('update');

    this.inputCreateName = document.getElementById('create-name');
    this.inputCreateColor = document.getElementById('create-color');
    this.submitCreateButton = document.getElementById('create-submit');
    this.submitCreate = document.getElementById('create');
  },

  async listenCreateCar(): Promise<void> {
    (this.submitCreate as HTMLElement).addEventListener('submit', async (event) => {
      event.preventDefault();
      const car: CarCreate = {
        name: (this.inputCreateName as HTMLInputElement).value,
        color: (this.inputCreateColor as HTMLInputElement).value,
      };
      await Model.createCar(car);
      await Store.updateStoreGarage();
      PageControls.updateGarageView();
      (this.inputCreateName as HTMLInputElement).value = '';
      (this.inputCreateColor as HTMLInputElement).value = '#ffffff';
    });
  },

  async listenUpdateCar(): Promise<void> {
    (this.submitUpdate as HTMLElement).addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!Store.selectedCar.id) return;
      const updateBody = {
        name: (this.inputUpdateName as HTMLInputElement).value,
        color: (this.inputUpdateColor as HTMLInputElement).value,
      };
      await Model.updateCar(Store.selectedCar.id, updateBody);
      await Store.updateStoreGarage();
      PageControls.updateGarageView();
      (this.inputUpdateName as HTMLInputElement).value = '';
      (this.inputUpdateColor as HTMLInputElement).value = '#ffffff';
      Store.selectedCar = { name: '', color: '', id: 0 };
      this.setUpdateControlsEnable(false);
    });
  },

  setUpdateControlsEnable(value: boolean): void {
    (this.inputUpdateName as HTMLInputElement).disabled = !value;
    (this.inputUpdateColor as HTMLInputElement).disabled = !value;
    (this.submitUpdateButton as HTMLButtonElement).disabled = !value;
  },

};
