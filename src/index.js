const { GraphQLServer } = require('graphql-yoga');

// Populate dummy data to be returned later (a mock database in memory)
const links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial on GraphQL',
  },
  {
    id: 'link-1',
    url: 'www.howtographql2.com',
    description: 'Fullstack tutorial on GraphQL - v2',
  },
];

let idCount = links.length;

// Every field in the schema needs a resolver function
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => links[args.id.substring(5)],
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const link = links[args.id.substring(5)];
      if (!link) return null;
      if (args.url) link.url = args.url;
      if (args.description) link.description = args.description;
      return link;
    },

    // Lazy implementation of delete – doesn't fix IDs/index values
    deleteLink: (parent, args) => {
      const index = args.id.substring(5);
      if (!links[index]) return null;
      // Array.prototype.splice returns an array of the removed items
      // In this case, there is only one removed item
      return links.splice(index, 1)[0];
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
});

server.start(() => console.log('server running on localhost:4000'));
