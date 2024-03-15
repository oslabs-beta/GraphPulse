const pool = require('../db/schemaModel');

const sessionController = {};

sessionController.createSession = async (req, res, next) => {
    try {
        console.log('-------> sessionController.createSession');
        // can't access cookies from req.cookies? so get SSID cookie from res.locals
        // const { ssid } = req.cookies;
        const cookiePass = res.locals.cookiePass;
        if (!cookiePass) throw new Error('No cookiePass cookie found!'); 
  
        const client = await pool.connect().catch((err) =>
            next({
                log: `sessionController.createSession - pool connection failed; ERROR: ${err}`,
                message: { err: 'Error in sessionController.createSession; Check server logs' }
            })
        );

        const findSession = 'SELECT * FROM sessions WHERE cookie_id=$1';
        const insertSession =  'INSERT INTO users(active_session) VALUES($1)';
        // look to see if session already exists with the cookie_id
        // if not, create session
        const result = await client.query(findSession, [cookiePass]);
        if (!result.rows[0]) {
            const sessionQCreate = `INSERT INTO sessions(cookie_id) VALUES($1) RETURNING _id, cookie_id `;
            const sessionQUpdateUser = `UPDATE users SET active_session = $1 WHERE _id = $2`
            const sessionQResult = await client.query(sessionQCreate, [cookiePass]);
            const session_id = sessionQResult.rows[0]._id;
            const session_cookie_id = sessionQResult.rows[0].cookie_id;
            client.query(sessionQUpdateUser, [session_id, session_cookie_id]);
            console.log('sessionController.createSession - session created');
            client.release();
            return next();
        } else {
            console.log('------> Session already exists');
        }
        client.release();
        return next();
    } catch (err) {
        return next({
        log: `sessionController.createSession - error creating session; ERROR: ${err}`,
        status: 400,
        message: { err: 'Error in sessionController.createSession; Check server logs' }
        });
    }
  };


sessionController.deleteSession = async (req, res, next) => {
    try {
        console.log('------> sessionController.deleteSession');
        const { ssid } = req.cookies;
        if (!ssid) throw new Error('No SSID cookie found!'); 

        for (var cookie in req.cookies) {
            res.clearCookie(cookie);
          }

        const client = await pool.connect().catch((err) =>
            next({
                log: `sessionController.deleteSession - pool connection failed; ERROR: ${err}`,
                message: { err: 'Error in sessionController.deleteSession. Check server logs' }
            })
        );

        const deleteSession = `DELETE FROM sessions WHERE cookie_id = $1`
        await client.query(deleteSession, [ssid]);
        const updateUser = `UPDATE users SET active_session = null WHERE _id = $1`
        await client.query(updateUser, [ssid])

        console.log('sessionController.deleteSession - session deleted');
        client.release();
        return next();

    } catch(err) {
        return next({
            log: `sessionController.deleteSession - error deleting session; ERROR: ${err}`,
            status: 400,
            message: { err: 'Error in sessionController.deleteSession; Check server logs' }
          });
    }
}


sessionController.isSignedIn = async (req, res, next) => {
    try {
        console.log('-------> sessionController.isSignedIn:');
        const { ssid } = req.cookies;

        const client = await pool.connect().catch((err) =>
            next({
                log: `sessionController.isSignedIn - pool connection failed; ERROR: ${err}`,
                message: { err: 'Error in sessionController.isSignedIn. Check server logs' }
            })
        );

        const findSession = 'SELECT * FROM sessions WHERE cookie_id=$1';
        const result = await client.query(findSession, [ssid]);

        if (!result.rows[0] && !req.query.isGuest) {
            res.locals.result = 'Session not found; Sign up or sign in to create session';
            console.log('------> sessionController.isSignedIn: session not found; please sign in')
            client.release();
            return res.redirect('/');
        }

        console.log('------> sessionController.isSignedIn: session found; User is signed in');
        req.ssid = ssid;
        client.release();
        return next();
    } catch (err) {
        return next({
            log: `sessionController.isSignedIn - error deleting session; ERROR: ${err}`,
            status: 400,
            message: { err: 'Error in sessionController.isSignedIn; Check server logs' }
          });
    }
};

module.exports = sessionController 