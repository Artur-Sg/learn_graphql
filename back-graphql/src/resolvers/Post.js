function postedBy(parent, args, context) {
  return context.prisma.post.findUnique({
    where: {
      id: parent.id
    }
  }).postedBy();
}

function votes(parent, args, context, info) {
  return context.prisma.post.findUnique({ where: { id: parent.id } }).votes();
}

function categories(parent, args, context, info) {
  return context.prisma.post.findUnique({ where: { id: parent.id } }).categories();
}

module.exports = {
  postedBy,
  votes,
  categories
}