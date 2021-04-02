const jwt = require('jsonwebtoken');
const APP_SECRET = 'GraphQl-is-aw3some';

function getTokenPlayload(token) {
  return jwt.verify(token, APP_SECRET);
}

function getUserId(req, authToken) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      if (!token) {
        throw new Error('No token found');
      }
      const { userId } = getTokenPlayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPlayload(authToken);
    return userId;
  }

  throw new Error('Not authenticated!');
}

module.exports = {
  APP_SECRET,
  getUserId
};