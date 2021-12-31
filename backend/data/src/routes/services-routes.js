const express = require('express');
const router = express.Router();
const { oneStock } = require('../lib/middleware/IEX_api');


router.get('/iex/search', oneStock, (req, res) => res.json(req.stocks.symbol));

router.get('/iex/findOne', oneStock, (req, res) => res.json(req.stocks));


module.exports = router;