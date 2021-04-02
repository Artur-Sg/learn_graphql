const { ApolloServer, PubSub } = require('apollo-server');
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { getUserId } = require('./utils')

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Post = require('./resolvers/Post');
const Subscription = require('./resolvers/Subscription');
const Vote = require('./resolvers/Vote');
const Category = require('./resolvers/Category');

const resolvers = {
  Query,
  Mutation,
  User,
  Post,
  Subscription,
  Vote,
  Category
};

const prisma = new PrismaClient();
const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: ({ req }) => {
    return {
      ...req,
      prisma,
      pubsub,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    };
  }
});

server
  .listen()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );