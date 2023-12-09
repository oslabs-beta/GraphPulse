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

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const previousId = users[users.length - 1].id;
      user.id = previousId + 1;
      users.push(user);
      return user;
    },

    updateUser: (parent, args) => {
      const { id, newUsername } = args.input;
      let userUpdated;
      users.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });

      return userUpdated;
    },

    deleteUser: (parent, args) => {
      const id = args.id;
      users.remove((user) => user.id === Number(id));
      return null;
    },
  },
};

module.exports = resolvers;
