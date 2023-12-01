import express, { Express, json } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'; 
// import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from "fs";
import gql from "graphql-tag";

const app: Express = express();
const PORT = process.env.PORT || 4000;

// import resolvers from './resolvers.ts';

import 'reflect-metadata';
// import { AppDataSource } from './db/data-source';
// AppDataSource.initialize()
//     .then(() => {
//         // do database things
//     })
//     .catch(err => console.log(err));

app.use(express.json());
// set up server, typorm set up, testing using Graph Ql


export const typeDefs = gql(
  readFileSync("./db/schema.graphql", {
    encoding: "utf-8",
  })
);

const resolvers = {
  Query: {
    users: () => [
      {
        id: 2,
        username: 'John',
        email: "123@123.com",
        password: "test",
        queryLogs: [
          { query_name: 'get', timestamp: '2023-11-29T12:00:00Z', depth: 1, latency: 20 }]
      },
    ],
  },
};

const server: ApolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
await server.start();
  

// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
// });

// let url;
// startStandaloneServer(server, {
//     listen: {port: 3000},
// })
//     .then(result => url = result);


// console.log(`Server ready at: ${url}`);
app.use(
  '/graphql',
  json(),
  expressMiddleware(server)
);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});




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