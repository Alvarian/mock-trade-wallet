// prisma https://www.youtube.com/watch?v=mU8-nKwfw4Y

/*
    import dotenv
    import middlewares
    import prisma
    import routes
    use body parser
    use json from express
    use cookie parser
*/ 
require('dotenv/config');
const express = require('express');
const app = express();
const { hasAuth } = require('./src/lib/middleware/isAuth');

app.use(express.json());

// @assets, isAuth, cache, use assetsRoute
app.get('/assets', (req, res) => {
    res.send("assets hit");
});

// @search, isAuth, get all from IEX_api per character entry, using minimal 2 characters in req
const servicesRoutes = require('./src/routes/services-routes');
app.use('/services', hasAuth, servicesRoutes);


// @history, isAuth, cache, use historyRoute
app.get('/transactions', (req, res) => {
    res.send("transactions hit");
});


// @* catch with 404
app.use('*', (_req, res) => res.sendStatus(404));

// listen here
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Data server running on port", PORT));
