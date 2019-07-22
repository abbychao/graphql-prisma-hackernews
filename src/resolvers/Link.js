const Link = {
  postedBy: (parent, args, context) => context.prisma.link({ id: parent.id }).postedBy(),
  /*
    This shows how resolvers would work for a data type. However, since this implementation
    is so simple, it can actually be omitted and it will still work!
  */
  // id: parent => parent.id,
  // url: parent => parent.url,
  // description: parent => parent.description,
}

module.exports = Link;
