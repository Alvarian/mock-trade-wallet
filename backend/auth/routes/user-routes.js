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
const client = require('../database/config').cache();


// post / if login works using body details with password and user from db, cache (new refresh token)() and send (new access token)(). If not send status unauthorized
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.find({
        email: username
    });
console.log(user)
    if (!user || user.email !== username) return res.sendStatus(401)

    compare(password, user.pass, function(err, response) {
        if (err) return res.sendStatus(500);
        if (!response) return res.sendStatus(401);
        
        res.send('logged in');
    });
});

// post if user does not exist hash password and assign to username in db. After, send status okay
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    const userExists = await User.find({ email: username });
    
    if (userExists.length) return res.sendStatus(500);

    genSalt(10, function(err, salt) {
        if (err) return res.sendStatus(500);

        hash(password, salt, async (err, hash) => {
            if (err) return res.sendStatus(500);

            // Store hash in your password DB.
            const user = new User({ email: username, password: hash, role });

            try {
                const newUser = await user.save();

                res.sendStatus(200).json(newUser);
            } catch (err) {
                res.sendStatus(400).json({message: err});
            }
        });
    });
});

// delete if user and password match db, clear redis refresh token for user and send status okay
router.delete('/logout', (req, res) => res.send('logout hit'));

// expose 
module.exports = router;