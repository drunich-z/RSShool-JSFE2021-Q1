import SingleCar from '../../components/singleCar';
import Store from '../../shared/store';

export default {
  renderWinners(): string {
    return `
    <h2>Winners (${Store.winnersCount})</h2>
    <h3>Page (${Store.winnersPage})</h3>
    <table class="table" cellspacing="0" border="0" sellpadding="0">
      <thead>
        <th>Number</th>
        <th>Car</th>
        <th>Name</th>
        <th class="table-button table-wins 
          ${(Store.sortBy as string) === 'wins' ? Store.sortOrder : ''}" id="sort-by-wins">Wins</th>
        <th class="table-button table-time 
          ${(Store.sortBy as string) === 'time' ? Store.sortOrder : ''}" id="sort-by-time">Seconds</th>
      </thead>
      <tbody>
        ${Store.winners.map((winner: WinnerPlusCar, index: number) => `
          <tr>
            <td>${index + 1 + (Store.winnersPage - 1) * 10}</td>
            <td>${SingleCar.renderCarImage(winner.car.color)}</td>
            <td>${winner.car.name}</td>
            <td>${winner.wins}</td>
            <td>${winner.time}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    `;
  },

};
