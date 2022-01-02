const express = require('express');
const router = express.Router();


router.get('/', (req, res) => res.send('get one user'));

router.post('/', (req, res) => res.json({body: req.body, cookies: req.cookies}));


module.exports = router;