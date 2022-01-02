/*
    import redis
    import jwt
    import cookies? as payload
*/
const jwt = require('jsonwebtoken');
const { redis } = require('../../database/config');
const logger = require('../logger');


// If theres no refresh token, send status forbidden. If refresh token is not found in redis send status forbidden. If refresh token is valid attach new access token with 15s duration to payload and next

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        logger.info("Error", "Token does not exist!");
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, userData) => {
        if (err) {
            logger.info(err.name, err.message);
            return res.sendStatus(403);
        }

        const cacheDB = await redis;
        const cachedToken = await cacheDB.get(userData.email);
        if (!cachedToken || cachedToken !== token) {
            logger.info("Error", "Refresh token is expired!");
            return res.sendStatus(401);
        };
    
        req.user = userData;
        next();
    });
}
