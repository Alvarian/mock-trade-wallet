/*
    import redis
    import jwt
    import cookies? as payload
*/
const jwt = require('jsonwebtoken');
const { redis } = require('../../database/config');
const logger = require('../logger');


// If theres no refresh token, send status forbidden. If refresh token is not found in redis send status forbidden. If refresh token is valid attach new access token with 15s duration to payload and next

module.exports = async (req, res, next) => {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    const token = req.cookies.refreshToken;
    if (!token) {
        logger.info("Error", "Token does not exist!");
        return res.sendStatus(401);
    }

    const cacheDB = await redis;
    const cachedToken = await cacheDB.get(req.cookies.user_id);
    if (cachedToken === token) return next();

    try {
        await verifyRefreshToken(token);
        await cacheDB.setEx(req.cookies.user_id, 24 * 60 * 60, token);

        next();
    } catch (err) {
        logger.info("Error in isRefreshToken", err);
        return res.sendStatus(403);
    }
}
