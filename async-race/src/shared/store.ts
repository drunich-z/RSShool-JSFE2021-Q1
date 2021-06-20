import Model from '../model';
import './types';

// const { items: carsTemp, count: carsCount } = await Model.getCars(1);
const { items: cars, count: carsCount } = await Model.getCarsPlusFlag(1);
const { items: winners, count: winnersCount } = await Model.getWinners({
  page: 1, limit: 10, sort: 'id', order: 'ASC',
});

const animation: Record<number, AnimationId> = {};
const selectedCar: Car = { name: '', color: '', id: 0 };
const view = 'garage' as PageView;
const sortBy = 'id' as SortType;
const sortOrder = 'desc' as OrderType;

const PAGE_WINNERS_ITEMS_LIMIT = 10;
const PAGE_GARAGE_ITEMS_LIMIT = 7;

export default {
  carsPage: 1,
  cars,
  carsCount,
  winnersPage: 1,
  winners,
  winnersCount,
  animation,
  view,
  sortBy,
  sortOrder,
  pageGarageLimit: PAGE_GARAGE_ITEMS_LIMIT,
  pageWinnersLimit: PAGE_WINNERS_ITEMS_LIMIT,
  selectedCar,

  async updateStoreGarage(): Promise<void> {
    const { items, count } = await Model.getCarsPlusFlag(this.carsPage);
    this.cars = items;
    this.carsCount = count;
  },

  async updateStoreWinners(): Promise<void> {
    const { items, count } = await Model.getWinners({
      page: this.winnersPage,
      limit: PAGE_WINNERS_ITEMS_LIMIT,
      sort: this.sortBy,
      order: this.sortOrder,
    });
    this.winners = items;
    this.winnersCount = count;
  },

  setForceStopFlag(id: number, value:boolean): void {
    const currentCarInStore = this.cars.find((carr) => carr.id === id);
    if (currentCarInStore) currentCarInStore.forceStop = value;
  },

  getForceStopFlag(id: number): boolean {
    const currentCarInStore = this.cars.find((carr) => carr.id === id);
    return Boolean(currentCarInStore?.forceStop);
  },
};
