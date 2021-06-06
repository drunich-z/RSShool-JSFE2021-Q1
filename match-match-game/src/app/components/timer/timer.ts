import './timer.scss';
import { BaseComponent } from '../base-component';
// import { delay } from '../../../shared/delay'

export class Timer extends BaseComponent {
  private timerId = 0;

  private startTime = 0;

  private finishTime = 0;

  constructor() {
    super('div', ['game-timer']);
  }

  start(): void {
    this.element.innerText = '00:00';
    this.startTime = Date.now();
    let diff = 0;
    this.timerId = window.setInterval(() => {
      diff = Date.now() - this.startTime;
      this.element.innerText = `${this.milisecundesToMinutesAndSeconds(diff)}`;
    }, 1000);
  }

  startCountDown(miliSeconds: number): void {
    const start = miliSeconds + 500;
    let count = 1;
    let diff = 0;
    this.element.innerText = '00:00';
    this.timerId = window.setInterval(() => {
      diff = start - count * 1000;
      count += 1;
      this.element.innerText = `${this.milisecundesToMinutesAndSeconds(diff)}`;
    }, 1000);
  }

  stop = (): void => {
    clearInterval(this.timerId);
    this.finishTime = Date.now();
  };

  restart = (): void => {
    this.stop();
    this.start();
  };

  getTotalSeconds = ():number => Math.ceil((this.finishTime - this.startTime) / 1000);

  private milisecundesToMinutesAndSeconds = (duration: number): string => {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const strMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const strSeconds = (seconds < 10) ? `0${seconds}` : seconds;
    return `${strMinutes}:${strSeconds}`;
  };
}
