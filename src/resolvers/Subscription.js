// Resolvers for a subscription are different from other resolvers.
// Within an object, there are two key-value pairs:
// "subscribe" is the resolver function that is triggered by the event and returns an AsyncIterator
// The GraphQL server uses the AsyncIterator to push the data to the client
// "resolve" a function that returns the data

const Subscription = {
  newLink: {
    subscribe: (parent, args, context, info) => {
      const { filter } = args;
      return context.prisma.$subscribe.link({
        mutation_in: ['CREATED'],
        updatedFields_contains: filter,
      }).node();
    },
    resolve: payload => payload,
  }
};


module.exports = Subscription;
