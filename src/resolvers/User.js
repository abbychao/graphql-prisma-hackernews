const User = {
  links: (parent, args, context) => context.prisma.user({ id: parent.id }).links(),
};

module.exports = User;
