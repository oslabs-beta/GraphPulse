const pool = require('../db/schemaModel');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const authController = {};

authController.createUser = async (req, res, next) => {
    console.log('---------> From authController.createUser');
    const {
        username,
        email,
        password
    } = req.body;

    const client = await pool.connect().catch((err) => 
        next({
            log: `authController.createUser - pool connection failed; ERROR: ${err}`,
            message: {
                err: 'Error in authController.createUser; Check server logs'
            }
        })
    );

    try {
        const findUser = 'SELECT * FROM users WHERE email=$1';
        const result = await client.query(findUser, [email]);
        if (!result.rows[0]) {
            const createUserQuery = `INSERT INTO users(username, email, password) VALUES($1, $2, $3)`
            bcrypt.hash(password, SALT_WORK_FACTOR, async (err, hash) => {
                if (err) {
                    return next({
                        log: `authController.createUser - bcrypt error; ERROR: ${err}`,
                        message: {
                            err: 'Error in authController.createUser; Check server logs'
                        }
                    })
                }
                client.query(createUserQuery, [
                    username,
                    email,
                    hash
                ]);
            });
            res.locals.result = 'User created successfully';
            // return next();
        } else {
            console.log('User already exists in database');
            res.locals.result = 'User already exists';
        }
    } catch (err) {
        return next({
            log: `authController.createUser - querying database for users error; ERROR: ${err}`,
            message: {
                err: 'Error in authController.createUser; Check server logs'
            }
        });
    } finally {
        // client.release();
        return next();
    }
};

authController.verifyUser = async (req, res, next) => {
    console.log('-------> authController.verifyUser');

    const client = await pool.connect().catch((err) =>
      next({
        log: `authController.verifyUser - pool connection failed; ERROR: ${err}`,
        message: {
          err: 'Error in authController.verifyUser; Check server logs',
        },
      })
    );
    try {
      const { username, password } = req.body;
      //|| !req.cookies.ssid GOES BELLOW TO CHECK FOR COOKIES?
      if (!username || !password) return res.redirect('/login/?Error=missing_info');
      const userQuery = `SELECT username, password FROM users WHERE username = $1`;
      const response = await client.query(userQuery, [username]);
      const passwordMatch = await bcrypt.compare(password, response.rows[0].password);
      if (!passwordMatch)
        res.status(401).send('Login failed; Incorrect username or password');
      else {
        client.release();
        return next();
      }
    } catch (err) {
      return next({
        log: `authController.verifyUser - querying listings from db ERROR: ${err}`,
        message: {
          err: 'Error in authController.verifyUser; Check server logs',
        },
      });
    }
  };


module.exports = authController;