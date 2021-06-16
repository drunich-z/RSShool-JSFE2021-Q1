import Store from '../../shared/store';
import SingleCar from '../../components/singleCar';

export default {

  renderGarage(): string {
    return `
    <h2>Garage (${Store.carsCount})</h2>
    <h3>Page (${Store.carsPage})</h3>
    <ul class="garage">
      ${Store.cars.map((car) => `<li>${SingleCar.renderCar(car)}</li>`).join('')}
    </ul>
  `;
  },

};
