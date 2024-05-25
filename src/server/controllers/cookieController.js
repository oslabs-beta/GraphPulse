const pool = require('../db/schemaModel');

const cookieController = {};

cookieController.setSSIDCookie = async (req, res, next) => {
  let client;
  try {
    console.log('-------> cookieController.setSSIDCookie');
    const { username, password } = req.body;

    if (!username || !password) {
      throw new Error('ERROR: No username or password input');
    }

    client = await pool.connect().catch((err) => {
      throw new Error(`cookieController.setSSIDCookie - pool connection failed; ERROR: ${err}`);
    });

    const findUserQuery = 'SELECT * FROM users WHERE username=$1';
    const result = await client.query(findUserQuery, [username]);

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    const userInfo = result.rows[0];
    res.cookie('ssid', userInfo._id, { httpOnly: true });
    res.cookie('u', userInfo.username, { httpOnly: true });

    // For some reason sessionController can't access SSID cookie from req. 
    // So this will just pass it through the user ID since they're the same
    res.locals.cookiePass = userInfo._id;

    console.log('--------> SSID Cookie Set! Cookie:', userInfo._id);
    return next();
  } catch (err) {
    return next({
      log: `cookieController.setSSIDCookie - error setting cookie; ERROR: ${err.message}`,
      status: 400,
      message: { err: 'Error in cookieController.setSSIDCookie. Check server logs' }
    });
  } finally {
    if (client) client.release();
  }
};

module.exports = cookieController;
