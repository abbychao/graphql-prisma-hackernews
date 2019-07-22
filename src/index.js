const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

// Every field in the schema needs a resolver function
// There are 4 arguments passed to each resolver: root, args, context, info
// Similar to res.locals in the middleware chain, context is an readable
// and writable object passed along the resolver chain.
// We can access context.prisma because we attach it when we instantiate the GraphQLServer
// More info on these arguments and info: https://www.prisma.io/blog/graphql-server-basics-demystifying-the-info-argument-in-graphql-resolvers-6f26249f613a
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: (root, args, context) => context.prisma.links(),
    link: (root, args, context) => context.prisma.link({ id: args.id }),
  },
  Mutation: {
    post: (root, args, context) => context.prisma.createLink({
      url: args.url,
      description: args.description,
    }),
    updateLink: (root, args, context) => {
      const data = {};
      if (args.url) data.url = args.url;
      if (args.description) data.description = args.description;
      return context.prisma.updateLink({
        data,
        where: { id: args.id },
      });
    },
    // Lazy implementation of delete – doesn't fix IDs/index values
    deleteLink: (parent, args, context) => {
      return context.prisma.deleteLink({ id: args.id });
    },
  },

  /*
    This shows how resolvers would work for a data type. However, since this implementation
    is so simple, it can actually be omitted and it will still work!
  */
  // Link: {
  //   id: parent => parent.id,
  //   url: parent => parent.url,
  //   description: parent => parent.description,
  // },
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
});

server.start(() => console.log('server running on localhost:4000'));
