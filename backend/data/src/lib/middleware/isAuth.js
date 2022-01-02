// jwt https://www.youtube.com/watch?v=mbsmsi7l3r4
// roles https://www.youtube.com/watch?v=jI4K7L-LI58&list=PLIZKsi9EQsSTegkbLi2uIcEJvZqKCM__e&index=92

/*
    import jwt
    import db_user
*/
const jwt = require('jsonwebtoken');
const { redis } = require('../../database/config');
const logger = require('../logger');
const verifyAccessToken = require('../verifyAccessToken');


// @hasAuth next if token is valid and if db_user matches decrypted token user name. if not res status of unauthorized or forbidden
module.exports.hasAuth = async function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        logger.info("Error", "Token does not exist!");
        return res.sendStatus(401);
    }

    const userID = req.cookies.user_id;
    const cacheDB = await redis;
    const cachedToken = await cacheDB.get(userID);
    if (cachedToken && cachedToken === token) {
        await cacheDB.setEx(userID, 60, token);

        next();
    }

    try {
        await verifyAccessToken(token, userID);
        await cacheDB.setEx(userID, 60, token);

        next();
    } catch (err) {
        logger.info(err.name, err.message);
        return res.sendStatus(403);
    }
}

// @isHost next if users role is host, if not send status unauthorized
module.exports.isHost = function (req, res, next) {
    if (!req.token) {
        logger.info("Error", "Token does not exist!");
        res.sendStatus(401);
    }

    jwt.verify(req.token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            logger.info(err.name, err.message);
            return res.sendStatus(500);
        }

        if (!decoded) {
            logger.info("Error at isAuth", "Token is not valid!");
            return res.sendStatus(401);
        }

        next();
    });
}

