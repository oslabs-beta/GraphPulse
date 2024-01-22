// const User = require('../models/userModel');
// const Session = require('../models/sessionModel');
const pool = require('../db/schemaModel');

const cookieController = {};

cookieController.setSSIDCookie = async (req, res, next) => {
  try {
    console.log('-------> cookieController.setSSIDCookie');
    const { username, password } = req.body;
    if (!username || !password ) throw new Error('ERROR: No username or password input');

    const client = await pool.connect().catch((err) =>
      next({
        log: `cookieController.setSSIDCookie - pool connection failed; ERROR: ${err}`,
        message: {
          err: 'Error in cookieController.setSSIDCookie. Check server logs',
        },
      })
    );

    const findUser = 'SELECT * FROM users WHERE username=$1';
    const result = await client.query(findUser, [username]);
    const userInfo = result.rows[0];
    console.log('--------> cookieController - User Info: ', userInfo);
    await res.cookie('ssid', userInfo._id), { httpOnly: true };
    await res.cookie('u', userInfo.username, { httpOnly: true });
    client.release();
    // For some reason sessionController can't access SSID cookie from req. 
    // So this will just pass it through the user ID since they're the same
    res.locals.cookiePass = userInfo._id;
    console.log('--------> SSID Cookie Set! Cookie:', userInfo._id);
    return next();
  } catch (err) {
    return next({
      log: `cookieController.setSSIDCookie - error setting cookie; ERROR: ${err}`,
      status: 400,
      message: { err: 'Error in cookieController.setSSIDCookie. Check server logs' }
    });
  }
};

module.exports = cookieController;