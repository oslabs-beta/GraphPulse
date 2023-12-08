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
