const jwt = require('jsonwebtoken');

module.exports = (token) => jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);