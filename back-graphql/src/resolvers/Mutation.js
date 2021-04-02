
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils');

async function post(parent, args, context, info) {
  const { userId } = context;

  const newPost = await context.prisma.post.create({
    data: {
      description: args.description,
      postedBy: { connect: { id: userId } },
      imageUrl: args.imageUrl,
      title: args.title,
      text: args.text,
    },
  });
  context.pubsub.publish("NEW_POST", newPost);
  return newPost;
}

async function deletePost(parent, args, context, info) {
  return await context.prisma.post.delete({
    where: { id: +args.id }
  })
}

async function updatePost(parent, args, context, info) {
  return await context.prisma.post.update({
    where: { id: +args.id },
    data: {
      imageUrl: args.imageUrl,
      description: args.description,
      title: args.title,
      text: args.text,
    }
  });
}

async function category(parent, args, context, info) {
  const newCategory = await context.prisma.category.create({
    data: {
      title: args.title,
    },
  });
  context.pubsub.publish("NEW_CATEGORY", newCategory);
  return newCategory;
}

async function deleteCategory(parent, args, context, info) {
  return await context.prisma.category.delete({
    where: { id: +args.id }
  })
}

async function updateCategory(parent, args, context, info) {
  return await context.prisma.category.update({
    where: { id: +args.id },
    data: {
      title: args.title,
    }
  })
}

async function connectCategoryPost(parent, args, context, info) {
  return await context.prisma.post.update({
    where: { id: +args.postId },
    data: {
      categories: {
        connect: {
          id: +args.categoryId
        }
      }
    }
  });
}

async function disconnectCategoryPost(parent, args, context, info) {
  return await context.prisma.post.update({
    where: { id: +args.postId },
    data: {
      categories: {
        disconnect: {
          id: +args.categoryId
        }
      }
    }
  });
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: {
      ...args, password
    }
  })

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({
    where: {
      email: args.email
    }
  })
  if (!user) {
    throw new Error('No such user found!');
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password!');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  }
}

async function vote(parent, args, context, info) {
  const userId = getUserId(context);

  const vote = await context.prisma.vote.findUnique({
    where: {
      postId_userId: {
        postId: Number(args.postId),
        userId: userId
      }
    }
  })

  if (Boolean(vote)) {
    throw new Error(`Already voted for posts: ${args.postId}`);
  }

  const newVote = context.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      post: { connect: { id: Number(args.postId) } },
    }
  })
  context.pubsub.publish("NEW_VOTE", newVote)

  return newVote;
}

module.exports = {
  post,
  deletePost,
  updatePost,
  category,
  deleteCategory,
  updateCategory,
  connectCategoryPost,
  disconnectCategoryPost,
  login,
  signup,
  vote,
};