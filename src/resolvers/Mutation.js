const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils.js');

// Authentication functions
async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return { token, user };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) throw new Error('No such user found');
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) throw new Error('Invalid password');
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return { token, user };
}

// CRUD functions for links
function post(root, args, context) {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    // This relates the Link to the User using a "nested object write"
    // https://www.prisma.io/docs/1.34/prisma-client/basic-data-access/writing-data-JAVASCRIPT-rsc6/#nested-object-writes
    postedBy: { connect: { id: userId } },
  });
}

function updateLink(root, args, context) {
  const userId = getUserId(context);
  const { postedBy: authorId } = context.prisma.link({ id: args });
  if (!userId === authorId) throw new Error('Posts can only be updated by the original author');

  const data = {};
  if (args.url) data.url = args.url;
  if (args.description) data.description = args.description;
  return context.prisma.updateLink({
    data,
    where: { id: args.id },
  });
}

function deleteLink(parent, args, context) {
  const userId = getUserId(context);
  const { postedBy: authorId } = context.prisma.link({ id: args });
  if (!userId === authorId) throw new Error('Posts can only be deleted by the original author');
  return context.prisma.deleteLink({ id: args.id });
}

module.exports = {
  login,
  signup,
  post,
  updateLink,
  deleteLink,
};
