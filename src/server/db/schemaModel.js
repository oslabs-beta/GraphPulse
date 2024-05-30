const { Pool } = require('pg');
require('dotenv').config();

const PG_URI = process.env.PG_URI;

const pool = new Pool({
    connectionString: PG_URI,
    ssl: {
      require: true
    }
  });

module.exports = pool;

  // module.exports = {
  //   query: (text, params, callback) => {
  //     console.log('executed query', text);
  //     return pool.query(text, params, callback);
  //   }
  // };

//   const db = {
//     query: async (queryStr, values) => {
//       try {
//         const result = await pool.query(queryStr, values);
//         return result;
//       } catch (error) {
//         console.error("Error in db query:", error);
//         throw error;
//       }
//     },
//   };

// module.exports = db;