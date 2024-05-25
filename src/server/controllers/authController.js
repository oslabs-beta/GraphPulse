const pool = require('../db/schemaModel');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const authController = {};

authController.createUser = async (req, res, next) => {
  const client = await pool.connect().catch((err) => 
    next({
      log: `authController.createUser - pool connection failed; ERROR: ${err}`,
      message: { err: 'Error in authController.createUser; Check server logs' }
    })
  );

  if (!client) return;

  try {
    const { username, email, password } = req.body;

    const findUser = 'SELECT * FROM users WHERE email=$1';
    const result = await client.query(findUser, [email]);

    if (result.rows.length === 0) {
      const hash = await bcrypt.hash(password, SALT_WORK_FACTOR);

      const createUserQuery = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3)';
      await client.query(createUserQuery, [username, email, hash]);

      res.locals.result = 'User created successfully';
    } else {
      res.locals.result = 'User already exists';
    }

    return next();
  } catch (err) {
    return next({
      log: `authController.createUser - querying database for users error; ERROR: ${err}`,
      message: { err: 'Error in authController.createUser; Check server logs' }
    });
  } finally {
    client.release();
  }
};

authController.verifyUser = async (req, res, next) => {
  const client = await pool.connect().catch((err) =>
    next({
      log: `authController.verifyUser - pool connection failed; ERROR: ${err}`,
      message: { err: 'Error in authController.verifyUser; Check server logs' }
    })
  );

  if (!client) return;

  try {
    const { username, password } = req.body;

    const userQuery = 'SELECT username, password FROM users WHERE username = $1';
    const result = await client.query(userQuery, [username]);

    if (result.rows.length === 0) {
      res.status(401).send('Sign in failed; Incorrect username or password');
      return;
    }

    const passwordMatch = await bcrypt.compare(password, result.rows[0].password);

    if (!passwordMatch) {
      res.status(401).send('Sign in failed; Incorrect username or password');
    } else {
      return next();
    }
  } catch (err) {
    return next({
      log: `authController.verifyUser - querying database for users error; ERROR: ${err}`,
      message: { err: 'Error in authController.verifyUser; Check server logs' }
    });
  } finally {
    client.release();
  }
};

authController.deleteUser = async (req, res, next) => {
  const client = await pool.connect().catch((err) =>
    next({
      log: `authController.deleteUser - pool connection failed; ERROR: ${err}`,
      message: { err: 'Error in authController.deleteUser; Check server logs' }
    })
  );

  if (!client) return;

  try {
    const { id } = req.params;
    const deleteUserQuery = 'DELETE FROM users WHERE _id = $1';
    await client.query(deleteUserQuery, [id]);

    res.locals.result = 'User deleted successfully';
    return next();
  } catch (err) {
    return next({
      log: `authController.deleteUser - querying database for users error; ERROR: ${err}`,
      message: { err: 'Error in authController.deleteUser; Check server logs' }
    });
  } finally {
    client.release();
  }
};

module.exports = authController;
