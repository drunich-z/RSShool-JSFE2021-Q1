import Store from './store';
import './types';

const models = ['Tesla', 'Mersedes', 'BMW', 'Toyota', 'Lada', 'Moskvich', 'Opel', 'Porche', 'Subaru', 'Nissan'];
const names = ['Model S', 'CLK', 'X5', 'Caldina', 'Kalina', '412', 'Astra', 'Cayene', 'Forester', 'Cube'];

function getPositionAtCenter(element: HTMLElement): { x: number, y: number } {
  const {
    top, left, width, height,
  } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

function getRandomName(): string {
  const model = models[Math.floor(Math.random() * models.length)];
  const name = names[Math.floor(Math.random() * models.length)];
  return `${model} ${name}`;
}

function getRandomColor(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
}

export default {

  getDistanceBetweenElements(a: HTMLElement, b: HTMLElement): number {
    const aPosition = getPositionAtCenter(a);
    const bPosition = getPositionAtCenter(b);

    return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
  },

  animation(car: HTMLElement, distance: number, animationTime: number): { id: number } {
    let start = 0;
    const state = { id: 0 };

    function step(timestamp: number): void {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const passed = Math.round(time * (distance / animationTime));

      car.style.transform = `translateX(${Math.min(passed, distance)}px)`;
      if (passed < distance) {
        state.id = window.requestAnimationFrame(step);
      }
    }

    state.id = window.requestAnimationFrame(step);

    return state;
  },

  // async raceAll(promises: any, ids: any): Promise<any> {
  //   const { success, id, time } = await Promise.race(promises);

  //   if (!success) {
  //     const failedIndex = ids.failedIndex((i:any) => i === id);
  //     const restPromises = [...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1, promises.length)];
  //     const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
  //     return this.raceAll(restPromises, restIds);
  //   }

  //   return { ...Store.cars.find((car) => car.id === id), time: +(time / 1000).toFixed(2) };
  // },

  // async race(action: any): Promise<any> {
  //   const promises = Store.cars.map(({ id }) => {
  //     const startButton = document.getElementById(`start-engine-car-${id}`);
  //     console.log(startButton?.classList);

  //     return action(startButton);
  //   });

  //   const winner = await this.raceAll(promises, Store.cars.map((car) => car.id));

  //   return winner;
  // },

  // async race(action: any): Promise<any> {
  //   const promises = Store.cars.map(({ id }) => action(id));

  //   const winner = await this.raceAll(promises, Store.cars.map((car) => car.id));

  //   return winner;
  // },

  // разобраться с созданием массива машинок, map не получается
  generateRandomCars(count = 100): CarCreate[] {
    const result: CarCreate[] = new Array(count);
    for (let i = 0; i < count; i++) result[i] = { name: getRandomName(), color: getRandomColor() };
    return result;
  },

};
