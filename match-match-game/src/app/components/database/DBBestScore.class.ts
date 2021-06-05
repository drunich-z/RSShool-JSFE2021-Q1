import { DataAccess } from './DataAccess.class';
import { PlayerScore } from './PlayerScore.class';
import avaPict from '../../../assets/resource/avatar.png'


export class DBBestScore extends DataAccess<PlayerScore> {

  async addFivePlayersOnStart() {
    let res = await this.get('zverev-and@mail.ru');
    if (res == undefined) {
      this.add({ uid: 'zverev-and@mail.ru'
               , name: 'Andrey'
               , surname: 'Zverev'
               , email: 'zverev-and@mail.ru'
               , avatar: ''
               , score: 45
      });
    }
    res = await this.get('petrov@mail.ru');
    if (res == undefined) {
      this.add({ uid: 'petrov@mail.ru'
               , name: 'Ivan'
               , surname: 'Petrov'
               , email: 'petrov@mail.ru'
               , avatar: ''
               , score: 45
      });
    }
    res = await this.get('Bob.Marley@no.woman.no.cry');
    if (res == undefined) {
      this.add({ uid: 'Bob.Marley@no.woman.no.cry'
               , name: 'Bob'
               , surname: 'Marley'
               , email: 'Bob.Marley@no.woman.no.cry'
               , avatar: ''
               , score: 100
      });
    }
    res = await this.get('kevin.spacey@us.com');
    if (res == undefined) {
      this.add({ uid: 'kevin.spacey@us.com'
               , name: 'Kevin'
               , surname: 'Spacey'
               , email: 'kevin.spacey@us.com'
               , avatar: ''
               , score: 70
      });
    }
    res = await this.get('rsschool@cool.yep');
    if (res == undefined) {
      this.add({ uid: 'rsschool@cool.yep'
               , name: 'Student'
               , surname: 'Number1'
               , email: 'rsschool@cool.yep'
               , avatar: ''
               , score: 90
      });
    }
  }

  async getArrayOfFirstNSortedByScore(n: number = 1) {
    let result = await this.retrieve();
    return result
      .sort((a, b) => a.score > b.score ? -1 : 1)
      .slice(0, n);
  }

  
}


