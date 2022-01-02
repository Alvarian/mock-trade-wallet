const express = require('express');
const router = express.Router();
const { oneStock, searchStocks } = require('../lib/middleware/iex_api');


router.get('/tiingo/iex/search', searchStocks, (req, res) => res.json(req.stocks));

router.get('/tiingo/iex/findOne', oneStock, (req, res) => res.json(req.stocks));


module.exports = router;