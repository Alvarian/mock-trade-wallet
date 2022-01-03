const express = require('express');
const router = express.Router();
const { user } = require('../database/config');
const { isUser } = require('../lib/middleware/isAuth');


router.get('/', (req, res) => res.send('get one user'));

router.post('/', isUser, async (req, res) => {
    const { name, userID, isHost } = req.body;
    await user.create({
        data: { name, user_id: userID, isHost }
    });

    console.log({body: req.body, cookies: req.cookies})
    // res.json({body: req.body, cookies: req.cookies})
    res.sendStatus(200);
});


module.exports = router;