// jwt auth https://www.youtube.com/watch?v=mbsmsi7l3r4

/*
    import dotenv
    import middlewares
    import cookie parser? as payload
    import userRoutes
    use payload
    use json from express
    use databases
*/ 
require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const userRoutes = require('./routes/user-routes');
const isRefreshToken = require('./middleware/isRefreshToken');
const { generateAccessToken } = require('./lib/generateTokens');

require('./database/config');
app.use(express.json());


// @refresh post, isRefreshToken, send (new access token)()
app.post('/refresh_token', isRefreshToken, (req, res) => {
    const payload = req.user;
    
    const accessToken = generateAccessToken(payload);
    
    res.json({ accessToken });
});

app.use('/', userRoutes);

// @* get catch with 404
app.use('*', (_req, res) => res.sendStatus(404));


// listen here
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Auth server listening on port", PORT));
