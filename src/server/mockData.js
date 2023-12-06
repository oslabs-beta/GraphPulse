const users = [
  {
    id: '1',
    username: 'user1',
    email: 'user1@example.com',
    password: 'password1',

    queryLogs: [
      {
        query_name: 'Query 1',
        timestamp: new Date().toDateString(),
        depth: 3,
        latency: 50,
      },
      {
        query_name: 'Query 2',
        timestamp: new Date().toDateString(),
        depth: 2,
        latency: 70,
      },
    ],
  },

  {
    id: '2',
    username: 'user2',
    email: 'user2@example.com',
    password: 'password2',

    queryLogs: [
      {
        query_name: 'Query 3',
        timestamp: new Date().toDateString(),
        depth: 4,
        latency: 80,
      },
    ],
  },
];

module.exports = users;
