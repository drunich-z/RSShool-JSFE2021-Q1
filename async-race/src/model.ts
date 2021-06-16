import './shared/types';

const base = 'http://127.0.0.1:3000';
const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

const getSortOrder = (sort: string, order: string): string => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
};

const getWinnerStatus = async (id: number): Promise<number> => (await fetch(`${winners}/${id}`)).status;

export default {

  async getCar(id:number): Promise<Car> {
    return (await fetch(`${garage}/${id}`)).json();
  },

  async getCars(page: number, limit = 7): Promise<{ items: Cars, count: XCount }> {
    const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);
    return {
      items: await response.json(),
      count: response.headers.get('X-Total-Count'),
    };
  },

  async createCar(body: CarCreate): Promise <void> {
    (await fetch(garage, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })).json();
  },

  async deleteCar(id: number): Promise<void> {
    (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();
  },

  async updateCar(id: number, body: CarCreate): Promise<void> {
    (await fetch(`${garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })).json();
  },

  async startEngine(id: number): Promise<EngineParams> {
    return (await fetch(`${engine}?id=${id}&status=started`)).json();
  },

  async stopEngine(id: number): Promise<EngineParams> {
    return (await fetch(`${engine}?id=${id}&status=stopped`)).json();
  },

  async drive(id: number): Promise<{ success:boolean }> {
    const res = await fetch(`${engine}?id=${id}&status=drive`).catch();

    if (res.status !== 200) return { success: false };
    return { ...(await res.json()) };
  },

  async getWinners({
    page, limit = 10, sort, order,
  } :
  { page: number, limit: number, sort: string, order: string }): Promise<{ items: Winners, count: XCount }> {
    const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
    const items = await response.json();

    return {
      items: await Promise.all(items.map(async (winner: Winner) => ({
        ...winner, car: (await this.getCar(winner.id)),
      }))),
      count: response.headers.get('X-Total-Count'),
    };
  },

  async getWinner(id: number): Promise<Winner> {
    return (await fetch(`${winners}/${id}`)).json();
  },

  async deleteWinner(id: number): Promise<void> {
    (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();
  },

  async createWinner(body: Winner): Promise<void> {
    (await fetch(winners, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })).json();
  },

  async updateWinner(id: number, body: Winner): Promise<void> {
    (await fetch(`${winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })).json();
  },

  async saveWinner({ id, time } : { id:number, time:number }): Promise<void> {
    const winnerStatus = await getWinnerStatus(id);

    if (winnerStatus === 404) {
      await this.createWinner({ id, wins: 1, time });
    } else {
      const winner = await this.getWinner(id);
      await this.updateWinner(id, {
        id,
        wins: (winner.wins || 0) + 1,
        time: time < (winner.time || 100) ? time : winner.time,
      });
    }
  },

};
