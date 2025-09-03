const { RequestHistory } = require('./entities/RequestHistory');
const { SqliteDriver } = require('@mikro-orm/sqlite');

module.exports = {
  entities: [RequestHistory],
  dbName: 'requests.db',
  driver: SqliteDriver,   
   allowGlobalContext: true,
};
