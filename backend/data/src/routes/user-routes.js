const express = require('express');
const router = express.Router();
const { User } = require('../database/config');
const { isUser } = require('../lib/middleware/isAuth');


router.get('/', (req, res) => res.send('get one user'));

router.post('/', isUser, async (req, res) => {
    const { name, userID, isHost } = req.body;
    await User.create({
        data: { name, user_id: userID, isHost }
    });
    
    return res.sendStatus(200);
});


module.exports = router;