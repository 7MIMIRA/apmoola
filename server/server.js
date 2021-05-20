const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../schema/schema.js');
const resolvers = require('../resolvers/resolvers.js');

startApolloServer();

async function startApolloServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({ port: 4000 }, resolve));
  console.log(`listening on http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}
