async function feed(parent, args, context, info) {
  const where = args.filter
    ? {
      OR: [
        { description: { contains: args.filter } },
        { title: { contains: args.filter } },
        { text: { contains: args.filter } },
        { categories: { some: { title: { contains: args.filter } } } }
      ],
    }
    : {}

  const posts = await context.prisma.post.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  })

  const count = await context.prisma.post.count({ where })

  return {
    posts,
    count,
  }
}

function post(parent, args, context, info) {
  return context.prisma.post.findUnique({ where: { id: +args.id } });
}

async function categoriesFeed(parent, args, context, info) {
  const where = args.filter
    ? {
      OR: [
        { title: { contains: args.filter } },
      ],
    }
    : {}

  const categories = await context.prisma.category.findMany({
    where,
    skip: args.skip,
    take: args.take,
    orderBy: args.orderBy,
  })

  const count = await context.prisma.category.count({ where })

  return {
    categories,
    count,
  }
}

function category(parent, args, context, info) {
  const category = context.prisma.category.findUnique({
    where: { id: +args.id }
  });

  if (!category) {
    throw new Error('No such category found!');
  }
  return category;
}

module.exports = {
  feed,
  post,
  categoriesFeed,
  category
};