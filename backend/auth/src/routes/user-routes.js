/*
    import bcryptjs
    import router
    import lib
    import models
    use Token
    use User
*/
const express = require('express');
const axios = require('axios');
const router = express.Router();
const { hash, genSalt, compare } = require('bcryptjs');
const { generateAccessToken, generateRefreshToken } = require('../lib/generateTokens');
const User = require('../models/User');
const { hasAuth, isUser } = require('../lib/middleware/isAuth');
const { redis } = require('../database/config');
const logger = require('../lib/logger');
const { createHash } = require('crypto');


// post / if login works using body details with password and user from db, cache (new refresh token)() and send (new access token)(). If not send status unauthorized
router.post('/login', hasAuth, async (req, res) => {
    const user = req.user;
    
    const refreshToken = generateRefreshToken(user.toJSON());
    const cacheDB = await redis;
    cacheDB.setEx(user.email, 3600, refreshToken);

    res.cookie('accessToken', generateAccessToken({user_id: user.userID}), {
        httpOnly: true, 
        // secure: true // turn on in prod
    });

    res.json(res.cookies); // turn off when client is connected
    // res.sendStatus(200);
});

// post if user does not exist hash password and assign to username in db. After, send status okay
router.post('/register', isUser, async (req, res) => {
    const { username, password, isHost, name } = req.body;

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
            const userID = createHash('sha256').update(username).digest('hex');

            try {
                // first post for a new user in data server 
                await axios.post(process.env.DATA_API_URL_DEV, {
                    name,
                    userID,
                    isHost
                });

                const user = new User({ email: username, password: hash, isHost, userID, name });

                await user.save();

                res.sendStatus(200);
            } catch (err) {
                logger.info("Error at register", err);
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