/*
    import router
    import models
    use User
*/
const express = require('express');
const router = express.Router();
const { Assets, User } = require('../database/config');
const logger = require('../lib/logger');
const registerTransaction = require('../lib/registerTransaction');
const { hasAmount } = require('../lib/middleware/isAuth');


// get assets from db using user
router.get('/', async (req, res) => {
    try {
        const userRecord = await User.findUnique({
            where: {
                user_id: req.cookies.user_id,
            },
        });

        if (userRecord || userRecord?.length) {
            const data = await Assets.findMany({
                where: {
                    accountId: userRecord.id
                }
            });

            res.json(data);
        } else {
            res.json(userRecord || []);
        }
    } catch (err) {
        logger.info("Error in assets routes", err);

        res.sendStatus(404);
    }
});

// @buy post to db new asset from details in req body and new transaction with time stamp and append to transactions & assets caches
router.post('/buy', hasAmount, async (req, res) => {
    const { symbol, amount } = req.body;
    try {
        const userRecord = await User.findUnique({
            where: {
                user_id: req.query.user_id,
            },
        });

        const hasAsset = await Assets.findMany({
            where: {
                accountId: userRecord.id,
                symbol
            }
        });

        await User.update({
            where: {
                id: userRecord.id,
            },
            data: {
                capital: {
                    decrement: req.body.price
                }
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
                accountId: userRecord.id, 
                total: amount 
            },
        });

        await registerTransaction(userRecord.id, amount, symbol, req.body.price);

        return res.sendStatus(200);
    } catch(err) {
        logger.info("Error in assets routes", err);
    }
});

module.exports = router;