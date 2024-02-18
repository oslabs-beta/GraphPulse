const pool = require('../db/schemaModel');

const queryController = {};


queryController.getUserQueryLogs = async (req, res, next) => {
  
  try {  
  const { u } = req.cookies;
  const {timestamp, endpoint, latency, depth} = req.body;

  const client = await pool.connect().catch((err) => 
  next({
      log: `authController.createUser - pool connection failed; ERROR: ${err}`,
      message: {
          err: 'Error in authController.createUser; Check server logs'
      }
  })
);

  const findUser = 'SELECT _id FROM users WHERE username=$1';
  const result = await client.query(findUser, [u]);
  const user_id = result.rows[0]._id;

  const findQueryLogs = 'SELECT * FROM querylogs WHERE user_id=$1';
  const queryLogs = await client.query(findQueryLogs, [user_id]);
  client.release();
  res.locals.queryLogs = queryLogs.rows;
  return next()
    
  } catch (error) {
    return next({
      log: `queryController.getUserQueryLogs - error querying database for query logs; ERROR: ${error}`,
      message: {
      err: 'Error in queryController.getUserQueryLogs; Check server logs'
      }
    
    })
  }
  

};


queryController.addQueryLog = async (req, res, next) => {
    try {
        const { u } = req.cookies;
        const {timestamp, endpoint, latency, depth} = req.body;
        const client = await pool.connect().catch((err) =>
            next({
                log: `queryController.addQueryLog - pool connection failed; ERROR: ${err}`,
                message: {
                    err: 'Error in queryController.addQueryLog; Check server logs'
                }
            })
        );
        const findUser = 'SELECT _id FROM users WHERE username=$1';
        const result = await client.query(findUser, [u]);
        if (!result.rows[0]) {
            res.locals.error = 'No user found with that session';
        } else {
            const user_id = result.rows[0]._id;
            const { timestamp, endpoint, latency, depth } = req.body;
            const addQueryLog = `INSERT INTO querylogs(timestamp, endpoint, latency, depth, user_id) VALUES($1, $2, $3, $4, $5)`
            await client.query(addQueryLog, [timestamp, endpoint, latency, depth, user_id]);
          console.log('------> queryController.addQueryLog - Query log added successfully');

        }
        client.release();
        res.locals.result = result;
        return next();
    } catch (err) {
        return next({
            log: `queryController.addQueryLog - error querying database for query logs; ERROR: ${err}`,
            message: {
                err: 'Error in queryController.addQueryLog; Check server logs'
            }
        });
    }



};

queryController.deleteQueryLog = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const client = await pool.connect().catch((err) =>
            next({
                log: `queryController.deleteQueryLog - pool connection failed; ERROR: ${err}`,
                message: {
                    err: 'Error in queryController.deleteQueryLog; Check server logs'
                }
            })
        );

        const deleteQueryLog = 'DELETE FROM querylogs WHERE _id=$1';
        await client.query(deleteQueryLog, [id]);
        console.log('------> queryController.deleteQueryLog - Query log deleted successfully');
        client.release();
        return next();
    } catch (err) {
        return next({
            log: `queryController.deleteQueryLog - error querying database for query logs; ERROR: ${err}`,
            message: {
                err: 'Error in queryController.deleteQueryLog; Check server logs'
            }
        });
    }
}

module.exports = queryController;
