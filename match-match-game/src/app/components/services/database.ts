export class dataBaseForScore {
  // public db: IDBDatabase;

  constructor() {

  }

  init(dbName: string, version?:number) {
    const iDB = window.indexedDB;
    const openRequest = iDB.open(dbName, version);
    openRequest.onupgradeneeded = () => {
      const database = openRequest.result;
      const store = database.createObjectStore('testCollection', { keyPath: 'id', autoIncrement: true });
      store.createIndex('name', 'name');
      store.createIndex('email', 'email', { unique: true });
      // this.db = database;
    };
    openRequest.onsuccess = () => {
      // this.db = openRequest.result;
    };
  }
}
