/*
    import router
    import lib
    import models
    use Token
    use User
*/
const express = require('express');
const router = express.Router();
const { hash, genSalt, compare } = require('bcryptjs');

// post / if login works using body details with password and user from db, cache (new refresh token)() and send (new access token)(). If not send status unauthorized
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = true && {
        name: "guuh",
        pass: "$2a$10$sHEkTe21wpWrPF/pYOoRf.JYzA3s96JHdeYqrpTDaNXTQ2XiqOf4S"
    };

    if (!user || user.name !== username) return res.sendStatus(401)

    compare(password, user.pass, function(err, response) {
        if (err) return res.sendStatus(500);
        if (!response) return res.sendStatus(401);
        
        res.send('logged in')
    });
});

// post if user does not exist hash password and assign to username in db. After, send status okay
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    const userExists = false;

    if (userExists) {
        return res.sendStatus(500);
    }

    genSalt(10, function(err, salt) {
        hash(password, salt, function(err, hash) {
            if (err) return res.sendStatus(500);

            // Store hash in your password DB.
            res.json({
                username,
                password: hash
            });
        });
    });
});

// delete if user and password match db, clear redis refresh token for user and send status okay
router.delete('/logout', (req, res) => res.send('logout hit'));

// expose 
module.exports = router;