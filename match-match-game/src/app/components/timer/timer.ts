import './timer.scss';
import { BaseComponent } from '../base-component';
//import { delay } from '../../../shared/delay'

export class Timer extends BaseComponent {
  private timerId: any;
  private startTime: number = 0;

  constructor() {
    super('div', ['game-timer']);
  }

  start() {
    this.element.innerText = '00:00';
    this.startTime = Date.now();
    let diff = 0;
    this.timerId = setInterval(() => {
      diff = Date.now() - this.startTime;
      this.element.innerText = `${this.milisecundesToMinutesAndSeconds(diff)}`;
    }, 1000);
  }

  stop() {
    clearInterval(this.timerId);
  }

  pause() {
    return;
  }

  restart() {
    this.stop();
    this.start();
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
