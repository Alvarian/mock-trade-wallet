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
const { User } = require('../../database/config');


// @hasAuth next if token is valid and if db_user matches decrypted token user name. if not res status of unauthorized or forbidden
module.exports.hasAuth = async function (req, res, next) {
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];
    const userID = req.cookies.user_id;
    const token = req.cookies.accessToken;
    if (!token || !userID) {
        logger.info("Error in isAuth", "Token or user id does not exist!");
        return res.sendStatus(401);
    }
    
    const cacheDB = await redis;
    const cachedToken = await cacheDB.get(userID);
    if (cachedToken && cachedToken === token) {
        await cacheDB.setEx(userID, 60, token);

        return next();
    }

    try {
        const isVerified = await verifyAccessToken(token, userID);
        
        if (!isVerified) throw "Token is not valid!"
        
        await User.findUnique({
            where: {
                user_id: userID,
            },
        });
        await cacheDB.setEx(userID, 60, token);
        next();
    } catch(err) {
        logger.info("Error in isAuth", err);
        return res.sendStatus(403);
    }
}

module.exports.hasAmount = async function (req, res, next) {
    const userID = req.cookies.user_id;
    if (!userID) {
        logger.info("Error in isAuth", "Token or user id does not exist!");
        return res.sendStatus(401);
    }

    try {
        const userRecord = await User.findUnique({
            where: {
                user_id: userID,
            }
        });

        if (userRecord.capital < req.body.price) return res.sendStatus(403);

        req.capital = userRecord.capital;
        next();
    } catch (err) {
        logger.info("Error in isAuth", err);
        return res.sendStatus(403);
    }
}

// @isHost next if users role is host, if not send status unauthorized
module.exports.isHost = function (req, res, next) {
    if (!req.token) {
        logger.info("Error", "Token does not exist!");
        return res.sendStatus(401);
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

module.exports.isUser = async function (req, res, next) {
    const userExists = await User.findUnique({
        where: {
            user_id: req.body.userID,
        },
    });
    
    if (userExists) return res.sendStatus(200);

    next();
}