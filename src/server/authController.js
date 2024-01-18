const pool = require('./db/schemaModel');
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
            log: `authController - pool connection failed; ERROR: ${err}`,
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
            bcrypt.hash(password, SALT_WORK_FACTOR, (err, hash) => {
                if (err) {
                    return next({
                        log: `authController - bcrypt error; ERROR: ${err}`,
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
            res.locals.result = 'Sign up successful';
            return next();
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
        client.release();
        return next();
    }
};


module.exports = authController;