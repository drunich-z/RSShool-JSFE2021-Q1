type PageView = 'garage' | 'winners';

type Car = {
  name: string,
  color: string,
  id: number
};

// с флагом форсированной остановки
type CarPlus = {
  name: string,
  color: string,
  id: number
  forceStop: boolean
};

type CarCreate = {
  name: string,
  color: string
};

type Cars = Car[];
type CarsPlus = CarPlus[];

type XCount = string | null;

type EngineParams = {
  velocity: number,
  distance: number
};

type EngineStatus = 'started' | 'stopped' | 'drive';

type SortType = 'id' | 'wins' | 'time';

type OrderType = 'asc' | 'desc';

type Winner = {
  id: number,
  wins: number,
  time: number
};

type WinnerUpdate = {
  wins: number,
  time: number
};

type WinnerPlusCar = {
  id: number,
  wins: number,
  time: number,
  car: Car
};

type Winners = WinnerPlusCar[];

type AnimationId = { id: number };
