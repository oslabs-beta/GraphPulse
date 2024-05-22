const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { gql } = require('graphql-tag');
const fs = require('fs');
const typeDefs = require('./graphql/type-defs.js');
const resolvers = require('./graphql/resolvers.js');
const cors = require('cors');
const path = require('path');
const router = express.Router();
const cookieParser = require('cookie-parser');

const authController = require('./controllers/authController.js');
const cookieController = require('./controllers/cookieController.js');
const sessionController = require('./controllers/sessionController.js');
const queryController = require('./controllers/queryController.js');

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/assets', express.static(path.resolve(__dirname, '../client/assets')));
app.use('/', express.static(path.resolve(__dirname, '../../dist')));
// app.use('/home', express.static(path.resolve(__dirname, '../../dist')));
app.use('/signup', express.static(path.resolve(__dirname, '../../dist')));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

let url;
startStandaloneServer(server, {
  listen: { port: 4000 },
}).then((result) => (url = result));


app.post('/signup', 
  authController.createUser,
  cookieController.setSSIDCookie,
  sessionController.createSession,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

app.post('/signin', 
  authController.verifyUser, 
  cookieController.setSSIDCookie,
  sessionController.createSession,
  (req, res) => {
    return res.status(200).send('Signed in successfully');
  }
);

app.get('/',
(req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../../dist/index.html'));
}
);

app.get('/api/querylogs',
  queryController.getUserQueryLogs,
  (req, res) => {
    return res.status(200).json(res.locals.queryLogs);
  }
);

app.post('/api/addquerylog',
  queryController.addQueryLog,
  (req, res) => {
    return res.status(200).json(res.locals.result);
  }
);

app.delete('/api/deletequerylog/:id',
  queryController.deleteQueryLog,
  (req, res) => {
    return res.status(200).send('Query log deleted');
  }
);

app.delete('/api/deleteuser/:id',
  authController.deleteUser,
  (req, res) => {
    return res.status(200).send('User deleted');
  }
);

app.get('/signup',
(req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../../dist/index.html'));
}
);

app.get('/guest',
  (req, res) => {
    for(var cookie in req.cookies) {
      res.clearCookie(cookie);
    }
    const isGuest = 'true';
    return res.status(200).redirect('/home?isGuest=' + isGuest);
  }
);

app.get('/home',
sessionController.isSignedIn,
(req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../../dist/index.html'));
}
);

// app.post('/home', (req, res) => {
//   sessionController.isSignedIn,
//   queryController.addQueryLog,
//   (req, res) => {
//     return res.status(200).json(res.locals);
//     }
//   }
// );

app.delete('/home', 
  sessionController.deleteSession,
  (req, res) => {
    return res.status(200).send('Session deleted. Signed out successfully')
  }
);


app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () => {
  console.log(`...listening on port ${PORT}`);
});
