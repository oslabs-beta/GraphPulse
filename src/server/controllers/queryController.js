const pool = require('../db/schemaModel');

const queryController = {};

queryController.getUserQueryLogs = async (req, res, next) => {
  let client;
  try {
    const { u } = req.cookies;

    client = await pool.connect().catch((err) => {
      throw new Error(`queryController.getUserQueryLogs - pool connection failed; ERROR: ${err}`);
    });

    const findUser = 'SELECT _id FROM users WHERE username=$1';
    const result = await client.query(findUser, [u]);

    if (!result.rows.length) {
      throw new Error('User not found');
    }

    const user_id = result.rows[0]._id;
    const findQueryLogs = 'SELECT * FROM querylogs WHERE user_id=$1';
    const queryLogs = await client.query(findQueryLogs, [user_id]);

    res.locals.queryLogs = queryLogs.rows;
    return next();
  } catch (error) {
    return next({
      log: `queryController.getUserQueryLogs - error querying database for query logs; ERROR: ${error.message}`,
      message: { err: 'Error in queryController.getUserQueryLogs; Check server logs' },
    });
  } finally {
    if (client) client.release();
  }
};

queryController.addQueryLog = async (req, res, next) => {
  let client;
  try {
    const { u } = req.cookies;
    const { timestamp, endpoint, latency, depth } = req.body;

    client = await pool.connect().catch((err) => {
      throw new Error(`queryController.addQueryLog - pool connection failed; ERROR: ${err}`);
    });

    const findUser = 'SELECT _id FROM users WHERE username=$1';
    const result = await client.query(findUser, [u]);

    if (!result.rows.length) {
      res.locals.error = 'No user found with that session';
    } else {
      const user_id = result.rows[0]._id;
      const addQueryLog = `INSERT INTO querylogs(timestamp, endpoint, latency, depth, user_id) VALUES($1, $2, $3, $4, $5)`;
      await client.query(addQueryLog, [timestamp, endpoint, latency, depth, user_id]);

      console.log('------> queryController.addQueryLog - Query log added successfully');
      res.locals.result = 'Query log added successfully';
    }

    return next();
  } catch (err) {
    return next({
      log: `queryController.addQueryLog - error querying database for query logs; ERROR: ${err.message}`,
      message: { err: 'Error in queryController.addQueryLog; Check server logs' },
    });
  } finally {
    if (client) client.release();
  }
};

queryController.deleteQueryLog = async (req, res, next) => {
  let client;
  try {
    const { id } = req.params;

    client = await pool.connect().catch((err) => {
      throw new Error(`queryController.deleteQueryLog - pool connection failed; ERROR: ${err}`);
    });

    const deleteQueryLog = 'DELETE FROM querylogs WHERE _id=$1';
    await client.query(deleteQueryLog, [id]);

    console.log('------> queryController.deleteQueryLog - Query log deleted successfully');
    res.locals.result = 'Query log deleted successfully';
    return next();
  } catch (err) {
    return next({
      log: `queryController.deleteQueryLog - error querying database for query logs; ERROR: ${err.message}`,
      message: { err: 'Error in queryController.deleteQueryLog; Check server logs' },
    });
  } finally {
    if (client) client.release();
  }
};

module.exports = queryController;
