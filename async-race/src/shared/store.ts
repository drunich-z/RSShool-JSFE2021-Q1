import Model from '../model';
import './types';

const { items: cars, count: carsCount } = await Model.getCars(1);
const { items: winners, count: winnersCount } = await Model.getWinners({
  page: 1, limit: 10, sort: 'id', order: 'ASC',
});

const animation: any = {};
const selectedCar: Car = { name: '', color: '', id: 0 };

// не разобрался как сказать что свойства в export defaults определенного типа (самоопределнного), чтобы линт не ругался
// let sortBy: Sort; sortBy = 'wins'; sortBy = 'id';
// let view: PageView; view = 'winners'; view = 'garage';
// let sortOrder: Order; sortOrder = 'DESC'; sortOrder = 'ASC';
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
  view: 'garage',
  sortBy: 'id',
  sortOrder: 'desc',
  pageGarageLimit: PAGE_GARAGE_ITEMS_LIMIT,
  pageWinnersLimit: PAGE_WINNERS_ITEMS_LIMIT,
  selectedCar,

  async updateStoreGarage(): Promise<void> {
    const { items, count } = await Model.getCars(this.carsPage);
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
};
