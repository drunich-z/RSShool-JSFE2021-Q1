import { DataAccess } from './DataAccess.class';
import { Player } from './Player.class';

export class DBCurrentPlayer extends DataAccess<Player> {
  
  async setNone(){
    let res = await this.get('user');
    if (res == undefined) {
      this.add({ uid: 'user'
               , name: 'None'
               , surname: 'None'
               , email: 'none@none.ru'
               , avatar: ''
              });
    } else {
      this.update({ uid: 'user'
               , name: 'None'
               , surname: 'None'
               , email: 'none@none.ru'
               , avatar: ''
              });
    }
  }

  clear() {
    console.log('hek');
  }
  
}

