const pool = require('../db/schemaModel');

const sessionController = {};

sessionController.createSession = async (req, res, next) => {
  let client;
  try {
    console.log('-------> sessionController.createSession');
    const cookiePass = res.locals.cookiePass;
    if (!cookiePass) throw new Error('No cookiePass found!');

    client = await pool.connect().catch((err) => {
      throw new Error(`sessionController.createSession - pool connection failed; ERROR: ${err}`);
    });

    const findSession = 'SELECT * FROM sessions WHERE cookie_id=$1';
    const result = await client.query(findSession, [cookiePass]);

    if (!result.rows.length) {
      const sessionQCreate = 'INSERT INTO sessions(cookie_id) VALUES($1) RETURNING _id, cookie_id';
      const sessionQUpdateUser = 'UPDATE users SET active_session = $1 WHERE _id = $2';
      const sessionQResult = await client.query(sessionQCreate, [cookiePass]);
      const session_id = sessionQResult.rows[0]._id;
      const session_cookie_id = sessionQResult.rows[0].cookie_id;
      await client.query(sessionQUpdateUser, [session_id, session_cookie_id]);
      console.log('sessionController.createSession - session created');
    } else {
      console.log('------> Session already exists');
    }
    return next();
  } catch (err) {
    return next({
      log: `sessionController.createSession - error creating session; ERROR: ${err.message}`,
      status: 400,
      message: { err: 'Error in sessionController.createSession; Check server logs' },
    });
  } finally {
    if (client) client.release();
  }
};

sessionController.deleteSession = async (req, res, next) => {
  let client;
  try {
    console.log('------> sessionController.deleteSession');
    const { ssid } = req.cookies;
    if (!ssid) throw new Error('No SSID cookie found!');

    for (const cookie in req.cookies) {
      res.clearCookie(cookie);
    }

    client = await pool.connect().catch((err) => {
      throw new Error(`sessionController.deleteSession - pool connection failed; ERROR: ${err}`);
    });

    const deleteSession = 'DELETE FROM sessions WHERE cookie_id=$1';
    await client.query(deleteSession, [ssid]);
    const updateUser = 'UPDATE users SET active_session = null WHERE _id=$1';
    await client.query(updateUser, [ssid]);

    console.log('sessionController.deleteSession - session deleted');
    return next();
  } catch (err) {
    return next({
      log: `sessionController.deleteSession - error deleting session; ERROR: ${err.message}`,
      status: 400,
      message: { err: 'Error in sessionController.deleteSession; Check server logs' },
    });
  } finally {
    if (client) client.release();
  }
};

sessionController.isSignedIn = async (req, res, next) => {
  let client;
  try {
    console.log('-------> sessionController.isSignedIn');
    const { ssid } = req.cookies;

    client = await pool.connect().catch((err) => {
      throw new Error(`sessionController.isSignedIn - pool connection failed; ERROR: ${err}`);
    });

    const findSession = 'SELECT * FROM sessions WHERE cookie_id=$1';
    const result = await client.query(findSession, [ssid]);

    if (!result.rows.length && !req.query.isGuest) {
      res.locals.result = 'Session not found; Sign up or sign in to create session';
      console.log('------> sessionController.isSignedIn: session not found; please sign in');
      return res.redirect('/');
    }

    console.log('------> sessionController.isSignedIn: session found; User is signed in');
    req.ssid = ssid;
    return next();
  } catch (err) {
    return next({
      log: `sessionController.isSignedIn - error checking session; ERROR: ${err.message}`,
      status: 400,
      message: { err: 'Error in sessionController.isSignedIn; Check server logs' },
    });
  } finally {
    if (client) client.release();
  }
};

module.exports = sessionController;
