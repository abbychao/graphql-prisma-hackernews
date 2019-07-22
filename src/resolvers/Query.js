function info() {
  return `This is the API of a Hackernews Clone`
}

async function feed(root, args, context) {
  const { filter, skip, first, orderBy } = args;
  // With the "filter" argument, query should only return Link elements where
  // the URL OR description contains the filter string
  const where = filter ? {
    OR: [
      { description_contains: filter },
      { url_contains: filter },
    ],
  } : {};
  const links = await context.prisma.links({ where, skip, first, orderBy });
  const count = await context.prisma
    .linksConnection({ where })
    .aggregate()
    .count();
  return { links, count };
}

async function link(root, args, context) {
  return context.prisma.link({ id: args.id });
}

module.exports = {
  info,
  feed,
  link
};
