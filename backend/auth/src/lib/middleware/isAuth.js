const { compare } = require('bcryptjs');
const User = require('../../models/User');
const logger = require('../logger');


module.exports.hasAuth = async (req, res, next) => {
    const { username, password } = req.body;

    const [user] = await User.find({ email: username });
    
    if (!user || user.email !== username) {
        logger.info("Error at login", `User '${username}' does not exist!`);
        return res.sendStatus(403);
    }

    compare(password, user.password, (err, response) => {
        if (err) {
            logger.info("Error at login", err);
            return res.sendStatus(500);
        }

        if (!response) {
            logger.info("Error at login", `Password '${password}' is incorrect`);
            return res.sendStatus(401);
        }

        req.user = user;

        next();
    });
};

module.exports.isUser = async (req, res, next) => {
    const userExists = await User.find({ email: req.body.username });
    
    if (userExists.length) return res.sendStatus(401);

    next();
};