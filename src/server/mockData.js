const users = [
  {
    _id: '1',
    username: 'user1',
    email: 'user1@example.com',
    password: 'password1',

    queryLogs: [
      {
        query_name: 'Query 1 for User 1',
        timestamp: new Date().toDateString(),
        depth: 3,
        latency: 50,
      },
      {
        query_name: 'Query 2 for User 1',
        timestamp: new Date().toDateString(),
        depth: 2,
        latency: 70,
      },
    ],
  },

  {
    _id: '2',
    username: 'user2',
    email: 'user2@example.com',
    password: 'password2',

    queryLogs: [
      {
        query_name: 'Query 1 for User 2',
        timestamp: new Date().toDateString(),
        depth: 4,
        latency: 80,
      },
    ],
  },

  {
    _id: '3',
    username: 'user3',
    email: 'user3@example.com',
    password: 'password3',

    queryLogs: [
      {
        query_name: 'Query 1 for User 3',
        timestamp: new Date().toDateString(),
        depth: 5,
        latency: 60,
      },
      {
        query_name: 'Query 2 for User 3',
        timestamp: new Date().toDateString(),
        depth: 4,
        latency: 70,
      },
    ],
  },

  {
    _id: '4',
    username: 'user4',
    email: 'user4@example.com',
    password: 'password4',

    queryLogs: [
      {
        query_name: 'Query 1 for User 4',
        timestamp: new Date().toDateString(),
        depth: 6,
        latency: 90,
      },
      {
        query_name: 'Query 2 for User 4',
        timestamp: new Date().toDateString(),
        depth: 3,
        latency: 55,
      },
    ],
  },

  {
    _id: '5',
    username: 'user5',
    email: 'user5@example.com',
    password: 'password5',

    queryLogs: [
      {
        query_name: 'Query 1 for User 5',
        timestamp: new Date().toDateString(),
        depth: 4,
        latency: 75,
      },
      {
        query_name: 'Query 2 for User 5',
        timestamp: new Date().toDateString(),
        depth: 5,
        latency: 65,
      },
    ],
  },

  {
    _id: '6',
    username: 'user6',
    email: 'user6@example.com',
    password: 'password6',

    queryLogs: [
      {
        query_name: 'Query 1 for User 6',
        timestamp: new Date().toDateString(),
        depth: 7,
        latency: 85,
      },
      {
        query_name: 'Query 2 for User 6',
        timestamp: new Date().toDateString(),
        depth: 4,
        latency: 70,
      },
    ],
  },

  {
    _id: '7',
    username: 'user7',
    email: 'user7@example.com',
    password: 'password7',

    queryLogs: [
      {
        query_name: 'Query 1 for User 7',
        timestamp: new Date().toDateString(),
        depth: 6,
        latency: 80,
      },
      {
        query_name: 'Query 2 for User 7',
        timestamp: new Date().toDateString(),
        depth: 6,
        latency: 75,
      },
    ],
  },

  {
    _id: '8',
    username: 'user8',
    email: 'user8@example.com',
    password: 'password8',

    queryLogs: [
      {
        query_name: 'Query 1 for User 8',
        timestamp: new Date().toDateString(),
        depth: 5,
        latency: 70,
      },
      {
        query_name: 'Query 2 for User 8',
        timestamp: new Date().toDateString(),
        depth: 7,
        latency: 90,
      },
    ],
  },

  {
    _id: '9',
    username: 'user9',
    email: 'user9@example.com',
    password: 'password9',

    queryLogs: [
      {
        query_name: 'Query 1 for User 9',
        timestamp: new Date().toDateString(),
        depth: 8,
        latency: 95,
      },
      {
        query_name: 'Query 2 for User 9',
        timestamp: new Date().toDateString(),
        depth: 5,
        latency: 80,
      },

      {
        query_name: 'Query 3 for User 9',
        timestamp: new Date().toDateString(),
        depth: 5,
        latency: 80,
      },

      {
        query_name: 'Query 4 for User 9',
        timestamp: new Date().toDateString(),
        depth: 3,
        latency: 40,
      },
    ],
  },

  {
    _id: '10',
    username: 'user10',
    email: 'user10@example.com',
    password: 'password10',

    queryLogs: [
      {
        query_name: 'Query 1 for User 10',
        timestamp: new Date().toDateString(),
        depth: 6,
        latency: 85,
      },
      {
        query_name: 'Query 2 for User 10',
        timestamp: new Date().toDateString(),
        depth: 8,
        latency: 100,
      },
    ],
  },
];

module.exports = users;
