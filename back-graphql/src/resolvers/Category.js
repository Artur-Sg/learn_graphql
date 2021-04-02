function posts(parent, args, context) {
  return context.prisma.category.findUnique({
    where: { id: parent.id }
  }).post();
}

module.exports = {
  posts,
}

