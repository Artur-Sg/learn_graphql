function newPostSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_POST");
}

const newPost = {
  subscribe: newPostSubscribe,
  resolve: playload => {
    return playload
  }
}

function newVoteSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_VOTE");
}

const newVote = {
  subscribe: newVoteSubscribe,
  resolve: playload => {
    return playload
  },
}

module.exports = {
  newPost,
  newVote
}