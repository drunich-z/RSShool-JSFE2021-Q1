import Controller from './contoller';

function getRouteInfo(): string {
  const hash = window.location.hash ? window.location.hash.slice(1) : '';
  const [name] = hash.split('/');

  return name;
}

function handleHash(): void {
  const name = getRouteInfo();

  if (name) {
    if (name === 'cars-garage') Controller.garageRoute();
    if (name === 'race-winners') Controller.winnersRoute();
  }
}

export default {
  init():void {
    window.addEventListener('hashchange', handleHash);
    handleHash();
  },

};
