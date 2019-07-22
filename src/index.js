const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Link = require('./resolvers/Link');
const User = require('./resolvers/User');

// Every field in the schema needs a resolver function
// There are 4 arguments passed to each resolver: root, args, context, info
// Similar to res.locals in the middleware chain, context is an readable
// and writable object passed along the resolver chain.
// We can access context.prisma because we attach it when we instantiate the GraphQLServer
// More info on these arguments and info: https://www.prisma.io/blog/graphql-server-basics-demystifying-the-info-argument-in-graphql-resolvers-6f26249f613a
const resolvers = {
  Query,
  Mutation,
  Link,
  User,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma,
  }),
});

server.start(() => console.log('server running on localhost:4000'));
