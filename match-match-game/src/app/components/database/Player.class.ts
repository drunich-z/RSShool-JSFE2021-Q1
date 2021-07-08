import { Item } from "./Item.class";

export class Player extends Item{
    name: string;
    surname: string;
    email: string;

    constructor(uid: string, name: string, surname: string, email: string) {
      super(uid);
      this.name = name;
      this.surname = surname;
      this.email = email;
    }
  }