const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { gql } = require('graphql-tag');
const fs = require('fs');
const typeDefs = require('./graphql/type-defs.js');
const resolvers = require('./graphql/resolvers.js');
const cors = require('cors');

const path = require('path');

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

app.use('/', express.static(path.resolve(__dirname, '../../dist')));

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

let url;
startStandaloneServer(server, {
  listen: { port: 4000 },
}).then((result) => (url = result));

app.listen(PORT, () => {
  console.log(`...listening on port ${PORT}`);
});
