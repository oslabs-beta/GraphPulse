const { gql } = require('graphql-tag');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    queryLogs: [QueryLog]
  }

  type QueryLog {
    query_name: String!
    timestamp: String!
    depth: Int!
    latency: Int!
    user: User!
  }

  type Query {
    users: [User]
    user(_id: ID!): User!
    querylogs: [QueryLog!]!
    querylog(name: String!): QueryLog!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateUserInput {
    id: ID!
    email: String!
    newUsername: String!
    password: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(input: UpdateUserInput): User
    deleteUser(id: ID!): User
  }
`;

module.exports = typeDefs;
