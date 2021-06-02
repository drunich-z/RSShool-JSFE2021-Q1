import { Player } from './Player.class';

export class PlayerScore extends Player{
    score: number;
      
    constructor(uid: string, name: string, surname: string, email: string, score: number) {
      super(uid, name, surname, email);
      this.score = score;
    }
  }
