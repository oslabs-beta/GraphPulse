// import express, { Express } from 'express';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import 'reflect-metadata';
import { AppDataSource } from './data-source';
AppDataSource.initialize()
    .then(() => {
        // do database things
    })
    .catch(err => console.log(err));

// const app: Express = express();

// app.use(express.json());
// set up server, typorm set up, testing using Graph Ql

// SCHEMA
const typeDefs = `#graphql
  type User {
    id: Number
    username: String
    email: String
    password: String
    queryLogs: [QueryLog]
  }
  
  type QueryLog {
    query_name: String
    timestamp: Date
    depth: Number
    latency: Number
    user: User
  }

  type Query {
    users: [User]
  }
`;

// DATA SET / DUMMY DATA
const tests = [
    {
      id: 2,
      username: 'John',
      email: "123@123.com",
      password: "test",
      queryLogs: ["get","post"]
    },
  ];

// RESOLVER
const resolvers = {
    Query: {
        
      tests: () => tests,
    },
  };

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
const {url} = await startStandaloneServer(server, {
    listen: {port: 3000},
});


console.log(`Server ready at: ${url}`);