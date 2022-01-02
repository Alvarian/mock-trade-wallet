/*
    import router
    import models
    use User
*/
const express = require('express');
const router = express.Router();
const { assets } = require('../database/config');

// get assets from db using user
router.get('/', async (_req, res) => {
    const data = await assets.findMany();

    res.json(data);
});

// @buy post to db new asset from details in req body and new transaction with time stamp and append to transactions & assets caches
router.post('/buy', async (req, res) => {
    res.send('hey man')
});

module.exports = router;