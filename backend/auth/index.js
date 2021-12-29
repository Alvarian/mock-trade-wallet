// jwt auth https://www.youtube.com/watch?v=mbsmsi7l3r4

/*
    import bcryptjs
    import dotenv
    import middlewares
    import cookie parser? as payload
    import lib
    import userRoutes
    use body parser
    use payload
    use json from express
    use databases
*/ 
const express = require('express');
const app = express();
const userRoutes = require('./routes/user-routes')

require('dotenv/config');
app.use(express.json());


// @refresh post, isRefreshToken, send (new access token)()

// @login, use userRoute
app.use('/', userRoutes);

// @* get catch with 404
app.use('*', (req, res) => res.sendStatus(404));


// listen here
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Auth server listening on port", PORT));
