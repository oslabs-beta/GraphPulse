const pool = require('../db/schemaModel');

const sessionController = {};

sessionController.createSession = async (req, res, next) => {
    try {
        console.log('-------> sessionController.createSession:');
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
        } else {
            console.log('------> Session already exists');
        }
        client.release();
        return next();
    } catch (err) {
      return next({
        log: `sessionController.startSession - error starting session; ERROR: ${err}`,
        status: 400,
        message: { err: 'Error in sessionController.startSession; Check server logs' }
      });
    }
  };


sessionController.deleteSession = async (req, res, next) => {
    try {
        const { ssid } = req.cookies;
        console.log('------> req.cookies.ssid: ', ssid);
        if (!ssid) throw new Error('No SSID cookie found!'); 

        const client = await pool.connect().catch((err) =>
            next({
                log: `sessionController.deleteSession - pool connection failed; ERROR: ${err}`,
                message: { err: 'Error in sessionController.deleteSession. Check server logs' }
            })
        );

        const deleteSession = `DELETE FROM sessions `

    } catch(err) {

    }
}


// sessionController.isLoggedIn = (req, res, next) => {
//     console.log('-------> sessionController.isLoggedIn:');
// };

module.exports = sessionController 