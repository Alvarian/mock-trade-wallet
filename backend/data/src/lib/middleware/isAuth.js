// jwt https://www.youtube.com/watch?v=mbsmsi7l3r4
// roles https://www.youtube.com/watch?v=jI4K7L-LI58&list=PLIZKsi9EQsSTegkbLi2uIcEJvZqKCM__e&index=92

/*
    import jwt
    import db_user
*/
const jwt = require('jsonwebtoken');
const logger = require('../logger');


// @hasAuth next if token is valid and if db_user matches decrypted token user name. if not res status of unauthorized or forbidden
function hasAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        logger.info("Error", "Token does not exist!");
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            logger.info(err.name, err.message);
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
}

// @isHost next if users role is host, if not send status unauthorized
function isHost(req, res, next) {
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


// expose 
module.exports = {
    hasAuth, 
    isHost
}