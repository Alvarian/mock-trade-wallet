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
const isRefreshToken = require('./src/lib/middleware/isRefreshToken');
const { generateAccessToken } = require('./src/lib/generateTokens');
const cookieParser = require('cookie-parser');

require('./src/database/config');
app.use(express.json());
app.use(cookieParser());

// @refresh post, isRefreshToken, send (new access token)()
app.post('/refresh_token', isRefreshToken, (req, res) => {
    res.cookie('accessToken', generateAccessToken(req.cookies.user_id));
    
    res.sendStatus(200);
});

const userRoutes = require('./src/routes/user-routes');
app.use('/', userRoutes);

// @* get catch with 404
app.use('*', (_req, res) => res.sendStatus(404));


// listen here
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Auth server listening on port", PORT));
