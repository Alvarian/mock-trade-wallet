/*
    import router
    import models
    use User
*/
const express = require('express');
const router = express.Router();
const { Assets, User } = require('../database/config');
const logger = require('../lib/logger');

// get assets from db using user
router.get('/', async (_req, res) => {
    const data = await Assets.findMany();

    res.json(data);
});

// @buy post to db new asset from details in req body and new transaction with time stamp and append to transactions & assets caches
router.post('/buy', async (req, res) => {
    const { symbol, amount } = req.body;
    try {
        const userRecord = await User.findUnique({
            where: {
                user_id: req.query.user_id,
            },
        });

        const hasAsset = await Assets.findMany({
            where: {
                userId: userRecord.id,
                symbol
            }
        });
        
        await Assets.upsert({
            where: {
                id: hasAsset[0]?.id || 0
            },
            update: {
                total: {
                    increment: amount
                },
            },
            create: {
                symbol, 
                userId: userRecord.id, 
                total: amount 
            },
        });

        res.end();
    } catch(err) {
        logger.info("Error in assets routes", err);
    }
});

module.exports = router;