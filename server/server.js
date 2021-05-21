const { ApolloServer } = require('apollo-server');
const typeDefs = require('../schema/graphql.js');
const resolvers = require('../resolvers/resolvers.js');
const server = new ApolloServer({ typeDefs, resolvers });

server.listen()
  .then(({ url }) => {
    console.log(`Server listening on ${url}`);
  });
