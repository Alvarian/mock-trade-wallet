const jwt = require('jsonwebtoken');

module.exports = (token, userID) => jwt.verify(token, process.env.ACCESS_TOKEN_SECRET).user_id === userID;