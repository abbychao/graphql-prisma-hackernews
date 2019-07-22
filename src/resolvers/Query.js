const Query = {
  info: () => `This is the API of a Hackernews Clone`,
  feed: (root, args, context) => context.prisma.links(),
  link: (root, args, context) => context.prisma.link({ id: args.id }),
}

module.exports = Query;
