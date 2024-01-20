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

const authController = require('./authController.js');
const cookieController = require('./cookieController.js');

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/assets', express.static(path.resolve(__dirname, '../client/assets')));
app.use('/', express.static(path.resolve(__dirname, '../../dist')));

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
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

app.post('/signin', 
  authController.verifyUser, 
  cookieController.setSSIDCookie,
  (req, res) => {
    return res.status(200).send('Logged In Successfully!');
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
