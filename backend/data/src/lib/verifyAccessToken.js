const jwt = require('jsonwebtoken');

module.exports = (token) => jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);