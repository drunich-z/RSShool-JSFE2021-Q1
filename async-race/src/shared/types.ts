type PageView = 'garage' | 'winners';

type Car = {
  name: string,
  color: string,
  id: number
};

type CarCreate = {
  name: string,
  color: string
};

type Cars = Car[];

type XCount = string | null;

type EngineParams = {
  velocity: number,
  distance: number
};

type EngineStatus = 'started' | 'stopped' | 'drive';

type Sort = 'id' | 'wins' | 'time';

type Order = 'ASC' | 'DESC';

type Winner = {
  id: number,
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

// type Winner = {
//   id: number,
//   wins: number,
//   time: number
// };

// type WinnerPlusCar = {
//   winner: Winner,
//   car: Car
// };

// type Winners = WinnerPlusCar[];
