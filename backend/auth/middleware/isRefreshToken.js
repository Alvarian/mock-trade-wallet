/*
    import redis
    import jwt
    import cookies? as payload
*/
const jwt = require('jsonwebtoken');
const { redis } = require('../database/config');


// If theres no refresh token, send status forbidden. If refresh token is not found in redis send status forbidden. If refresh token is valid attach new access token with 15s duration to payload and next

module.exports = (req, res, next) => {
    const token = req.body.token;
    if (!token) return res.sendStatus(401);



    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, userData) => {
        if (err) return res.sendStatus(403);
        
        const cacheDB = await redis;
        const response = await cacheDB.get(userData.email);
        if (!response || response !== token) return res.sendStatus(401);
    
        req.user = userData;
        next();
    });
}
