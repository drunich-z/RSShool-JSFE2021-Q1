import { DataAccess } from './DataAccess.class';
import { PlayerScore } from './PlayerScore.class';


export class DBBestScore extends DataAccess<PlayerScore> {

  addFivePlayersOnStart() {
    this.add({ uid: 'zverev-and@mail.ru'
      , name: 'Andrey'
      , surname: 'Zverev'
      , email: 'zverev-and@mail.ru'
      , score: 45
    });
    this.add({ uid: 'petrov@mail.ru'
      , name: 'Ivan'
      , surname: 'Petrov'
      , email: 'petrov@mail.ru'
      , score: 45
    });
    this.add({ uid: 'Bob.Marley@no.woman.no.cry'
      , name: 'Bob'
      , surname: 'Marley'
      , email: 'Bob.Marley@no.woman.no.cry'
      , score: 100
    });
    this.add({ uid: 'kevin.spacey@us.com'
      , name: 'Kevin'
      , surname: 'Spacey'
      , email: 'kevin.spacey@us.com'
      , score: 70
    });
    this.add({ uid: 'rsschool@cool.yep'
      , name: 'Student'
      , surname: 'Number1'
      , email: 'rsschool@cool.yep'
      , score: 90
    });
  }

  async getArrayOfFirstNSortedByScore(n: number = 1) {
    let result = await this.retrieve();
    return result
      .sort((a, b) => a.score > b.score ? -1 : 1)
      .slice(0, n);
  }
}


