module.exports = {
  client: {
    service: {
      url: 'http://localhost:4000/graphql',
      headers: {
        authorization: `Bearer ${process.env.API_TOKEN}`
      },
    },
    includes: ['./src/queries.ts'],
  },
};
