const { Pool } = require('pg');

const PG_URI = 'postgres://exanapyf:Tltn8qzv43FUjkGxTmzsFheWqcXgpV44@berry.db.elephantsql.com/exanapyf';

const pool = new Pool({
    connectionString: PG_URI,
    ssl: {
      require: true,
    }
  });

  module.exports = pool;

  // module.exports = {
  //   query: (text, params, callback) => {
  //     console.log('executed query', text);
  //     return pool.query(text, params, callback);
  //   }
  // };