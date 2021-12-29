/*
    import router
    import lib
    import models
    use Token
    use User
*/
const express = require('express');
const router = express.Router();

// post / if login works using body details with password and user from db, cache (new refresh token)() and send (new access token)(). If not send status unauthorized
router.post('/login', (req, res) => res.send('login hit'));

// post if user does not exist hash password and assign to username in db. After, send status okay
router.post('/resgister', (req, res) => res.send('register hit'));

// delete if user and password match db, clear redis refresh token for user and send status okay
router.delete('/logout', (req, res) => res.send('logout hit'));

// expose 
module.exports = router;