export default {

  renderCarImage(color: string): string {
    return `
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
      xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 17.485 17.485" style="enable-background:new 0 0 17.485 17.485;" xml:space="preserve">
    <g>
      <g>
        <path style="fill:${color};" d="M17.477,8.149c-0.079-0.739-3.976-0.581-3.976-0.581L11.853,5.23H4.275L3.168,7.567H0v2.404
          l2.029,0.682c0.123-0.836,0.843-1.48,1.711-1.48c0.939,0,1.704,0.751,1.73,1.685l6.62,0.041c0.004-0.951,0.779-1.726,1.733-1.726
          c0.854,0,1.563,0.623,1.704,1.439l1.479-0.17C17.006,10.442,17.556,8.887,17.477,8.149z M4.007,7.568l0.746-1.771h2.864
          l0.471,1.771H4.007z M8.484,7.568L8.01,5.797h3.67l1.137,1.771H8.484z"/>
        <circle style="fill:#030104;" cx="3.759" cy="10.966" r="1.289"/>
        <circle style="fill:#030104;" cx="13.827" cy="10.9" r="1.29"/>
      </g>
    </g>
    </svg>
    `;
  },

  renderCar(car: Car): string {
    return `
    <div class="general-buttons">
      <button class="button select-button" id="select-car-${car.id}">Select</button>
      <button class="button remove-button" id="remove-car-${car.id}">Remove</button>
      <span class="car-name">${car.name}</span>
    </div>
    <div class="road">
      <div class="launchpad">
        <div class="control-panel">
          <button class="icon start-engine-button" id="start-engine-car-${car.id}">Start</button>
          <button class="icon stop-engine-button" id="stop-engine-car-${car.id}">Stop</button>
        </div>
        <div class="car" id="car-${car.id}">
          ${this.renderCarImage(car.color)}
        </div>
      </div>
      <div class="flag" id="flag-${car.id}">🏁</div>
    </div>
    `;
  },

};
