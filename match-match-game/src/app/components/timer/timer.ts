import './timer.scss';
import { BaseComponent } from '../base-component';

export class Timer extends BaseComponent {
  private timerId: any;

  constructor() {
    super('div', ['game-timer']);
  }

  startTimer() {
    this.element.innerText = '00:00';
    const start = Date.now();
    let diff = 0;
    this.timerId = setInterval(() => {
      diff = Date.now() - start;
      this.element.innerText = `${this.milisecundesToMinutesAndSeconds(diff)}`;
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerId);
  }

  pauseTimer() {

  }

  getTotalTime() {
    return 100;
  }

  private milisecundesToMinutesAndSeconds(duration: number) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const strMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const strSeconds = (seconds < 10) ? `0${seconds}` : seconds;
    return `${strMinutes}:${strSeconds}`;
  }
}
