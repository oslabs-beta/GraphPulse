const users = require('../mockData.js');

const resolvers = {
  Query: {
    users: () => {
      return users;
    },
    user: (parent, args) => {
      const id = args.id;
      const user = users.find((user) => user.id === Number(args.id));
      return user;
    },
  },
};

module.exports = resolvers;

//const resolvers = {
//     Query: {
//       user(parent, args, contextValue, info) {
//         return users.find((user) => user.id === args.id);
//       },
//     },
//   };

// -------------------------------

// import { AppDataSource } from './db/data-source';
// import { typeDefs } from ".";

// AppDataSource.initialize()
//     .then(() => {
//         // do database things
//     })
//     .catch(err => console.log(err));

// const resolvers = {
//   Record: {
//     id: (parent) => parent.id ?? parent._id,
//   },
//   Query: {
//     async record(_, { id }) {
//       let collection = await db.collection("records");
//       let query = { _id: new ObjectId(id) };

//       return await collection.findOne(query);
//     },
//     async records(_, __, context) {
//       let collection = await db.collection("records");
//       const records = await collection.find({}).toArray();
//       return records;
//     },
//   },
//   Mutation: {
//     async createRecord(_, { name, position, level }, context) {
//       let collection = await db.collection("records");
//       const insert = await collection.insertOne({ name, position, level });
//       if (insert.acknowledged)
//         return { name, position, level, id: insert.insertedId };
//       return null;
//     },
//     async updateRecord(_, args, context) {
//       const id = new ObjectId(args.id);
//       let query = { _id: new ObjectId(id) };
//       let collection = await db.collection("records");
//       const update = await collection.updateOne(
//         query,
//         { $set: { ...args } }
//       );

//       if (update.acknowledged)
//         return await collection.findOne(query);

//       return null;
//     },
//     async deleteRecord(_, { id }, context) {
//       let collection = await db.collection("records");
//       const dbDelete = await collection.deleteOne({ _id: new ObjectId(id) });
//       return dbDelete.acknowledged && dbDelete.deletedCount == 1 ? true : false;
//     },
//   },
// };

// const resolvers = {
//     Query: {
//       users: () => users,
//     },
//   };

//   const resolvers = {
//     Query: {
//       user(parent, args, contextValue, info) {
//         return users.find((user) => user.id === args.id);
//       },
//     },
//   };

// export default resolvers;
