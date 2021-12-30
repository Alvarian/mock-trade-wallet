/*
    import bcryptjs
    import router
    import lib
    import models
    use Token
    use User
*/
const express = require('express');
const router = express.Router();
const { hash, genSalt, compare } = require('bcryptjs');
const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../lib/generateTokens')
const { redis } = require('../database/config');
const logger = require('../lib/logger');


// post / if login works using body details with password and user from db, cache (new refresh token)() and send (new access token)(). If not send status unauthorized
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const [user] = await User.find({ email: username });
    
    if (!user || user.email !== username) {
        logger.info("Error at login", `User '${username}' does not exist!`)
        return res.sendStatus(403);
    }

    compare(password, user.password, async (err, response) => {
        if (err) {
            logger.info("Error at login", err);
            return res.sendStatus(500);
        }

        if (!response) {
            logger.info("Error at login", `Password '${password}' is incorrect`);
            return res.sendStatus(401);
        }
        
        const payload = user.toJSON();
        const cacheDB = await redis;
        cacheDB.setEx(user.email, 3600, generateRefreshToken(payload));
        
        res.json({
            accessToken: generateAccessToken(payload),
            refreshToken: generateRefreshToken(payload)
        });
    });
});

// post if user does not exist hash password and assign to username in db. After, send status okay
router.post('/register', async (req, res) => {
    const { username, password, isHost } = req.body;
    const userExists = await User.find({ email: username });
    
    if (userExists.length) {
        logger.info("Error at register", `User '${userExists[0].email}' already exist!`);
        return res.sendStatus(403);
    }

    genSalt(10, function(err, salt) {
        if (err) {
            logger.info("Error at register", err);
            return res.sendStatus(500);
        }

        hash(password, salt, async (err, hash) => {
            if (err) {
                logger.info("Error at register", err);
                return res.sendStatus(500);
            }

            // Store hash in your password DB.
            const user = new User({ email: username, password: hash, isHost });

            try {
                await user.save();

                res.sendStatus(200);
            } catch (err) {
                res.sendStatus(400);
            }
        });
    });
});

// delete if user and password match db, clear redis refresh token for user and send status okay
router.delete('/logout', async (req, res) => {
    const cacheDB = await redis;
    cacheDB.del(req.body.username);

    res.sendStatus(204);
});

// expose 
module.exports = router;