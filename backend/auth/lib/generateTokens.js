/*
    import jwt
*/
const jwt = require('jsonwebtoken');


// generate access token
function generateAccessToken(userData) {
    return jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
}

// generate refresh token
function generateRefreshToken(userData) {
    return jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
};