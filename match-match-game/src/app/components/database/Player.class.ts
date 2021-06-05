import { Item } from './Item.class';

export class Player extends Item {
  name: string;

  surname: string;

  email: string;

  avatar: string;

  constructor(uid: string, name: string, surname: string, email: string, avatar = '') {
    super(uid);
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.avatar = avatar;
  }
}
