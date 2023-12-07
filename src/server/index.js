const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { gql } = require('graphql-tag');
const fs = require('fs');
const typeDefs = require('./graphql/type-defs.js');
const resolvers = require('./graphql/resolvers.js');

// require('reflect-metadata');
// const app = express();
const PORT = 3000;

// app.use(express.static('client'));

// app.use(express.json());

// const typeDefs = gql(
//   fs.readFileSync('./src/server/db/schema.graphql', {
//     encoding: 'utf-8',
//   })
// );

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// const serverStart = async() => await server.start();

// const { url } = await startStandaloneServer(server, {
//   listen: { port: 3000 },
// });

let url;
startStandaloneServer(server, {
  listen: { port: 3000 },
}).then((result) => (url = result));

// server.listen().then(({ url }) => {
//   console.log(`YOUR API IS RUNNING AT: ${url} :)`);
// });

console.log(`--------------> Server ready at: ${PORT}`);
// app.use(
//   '/graphql',
//   serverStart,
//   expressMiddleware(server)
// );

// // SCHEMA
// const typeDefs = `#graphql
//   type User {
//     id: ID
//     username: String
//     email: String
//     password: String
//     queryLogs: [QueryLog]
//   }

//   type QueryLog {
//     query_name: String
//     timestamp: Date
//     depth: Int
//     latency: Int
//     user: User
//   }

//   type Query {
//     users: [User]
//   }
// `;

// // DATA SET / DUMMY DATA
// const users = [
//     {
//       id: 2,
//       username: 'John',
//       email: "123@123.com",
//       password: "test",
//       queryLogs: [
//         { query_name: 'get', timestamp: '2023-11-29T12:00:00Z', depth: 1, latency: 20 }]
//     },
//   ];

// // RESOLVER
// const resolvers = {
//     Query: {
//       users: () => users,
//     },
//   };
