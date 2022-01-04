/*
    import jwt
*/
const jwt = require('jsonwebtoken');


// generate access token
function generateAccessToken(userData) {
    return jwt.sign({user_id: userData}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 5 * 60 * 60 });
}

// generate refresh token
function generateRefreshToken(userData) {
    return jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, { expiresIn: 24 * 60 * 60 });
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
};