const users = require('../mockData.js');

const pool = require('../db/schemaModel.js');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;


// const knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host : 'localhost',
//     // port : 3306,
//     user : 'exanapyf',
//     password : 'Tltn8qzv43FUjkGxTmzsFheWqcXgpV44',
//     database : 'users'
//   }
// });

const knex = require('knex')({
  client: 'pg',
  connection: 'postgres://exanapyf:Tltn8qzv43FUjkGxTmzsFheWqcXgpV44@berry.db.elephantsql.com/exanapyf',
  searchPath: ['knex', 'public'],
});



const resolvers = {
  Query: {
    users: () => {
      knex.select('*')
        .from('graphpulse')
    },
    user: (parent, args) => {
      const id = args.id;
      const user = users.find((user) => user.id === Number(args.id));
      return user;
    },
    querylogs: () => users.flatMap((user) => user.queryLogs),
    querylog: (parent, { name }) =>
      users
        .flatMap((user) => user.queryLogs)
        .find((log) => log.query_name === name),
  },

  Mutation: {
    createUser: async (_, args) => {
      // const user = args.input;
      // const previousId = users[users.length - 1].id;
      // user.id = previousId + 1;
      // users.push(user);

      console.log('-------> From createUser mutation')
      const username = args.input.username;
      const email = args.input.email;
      const password = args.input.password;
      
      const testUser = {
        username: username,
        email: email,
        password: password
      }
      console.log(`INPUTS:`, testUser);

      const [user] = await knex("users")
        .insert({ username, email, password })
        .into("users")

      return testUser;

      // const client = await pool.connect().catch((err) => 
      //   console.log(`ERROR: resolvers.js; createUser mutation - pool connection failed; ERROR: ${err}`)
      // );

      // try {
      //     const findUser = 'SELECT * FROM users WHERE email=$1';
      //     // const result = await client.query(findUser, [email]);

      //     if (!result.rows[0]) {
      //       const createUserQuery = `INSERT INTO users(username, email, password) VALUES($1, $2, $3)`
      //       bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
      //           if (err) {
      //             console.log(`ERROR: resolvers.js; createUser mutation - bcrypt error; ERROR: ${err}`);
      //             return;
      //           }
      //           client.query(createUserQuery, [
      //               username,
      //               email,
      //               hash
      //           ]);
      //       });

      //       const userResult = await client.query(findUser, [email]);
      //       console.log(userResult);
      //       // Type-def mutation is expecting a "User" object. See type-defs.js. Required to return user object.
      //       return userResult;
      //     } else {
      //         console.log('User already exists in database');
      //     }
      // } catch (err) {
      //   console.log(`ERROR: resolvers.js; createUser mutation - querying database for users error; ERROR: ${err}`);
      //   return;
      // } finally {
      //     client.release();
      //     return;
      // }

        // return user;
    },

    updateUser: (parent, args) => {
      const { id, newUsername } = args.input;
      let userUpdated;
      users.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });

      return userUpdated;
    },

    deleteUser: (parent, args) => {
      const id = args.id;
      const index = users.findIndex((user) => user.id === Number(id));
      if (index !== -1) {
        users.splice(index, 1);
      }
      return null;
    },
  },
};

module.exports = resolvers;
