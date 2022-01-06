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
require('./src/database/config');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const { hasAuth } = require('./src/lib/middleware/isAuth');

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

// @assets, isAuth, cache, use assetsRoute
const assetsRoutes = require('./src/routes/assets-routes');
app.use('/assets', hasAuth, assetsRoutes);

// @search, isAuth, get all from IEX_api per character entry, using minimal 2 characters in req
const servicesRoutes = require('./src/routes/services-routes');
app.use('/services', hasAuth, servicesRoutes);

const userRoutes = require('./src/routes/user-routes');
app.use('/user', userRoutes);

// @* catch with 404
app.use('*', (_req, res) => res.sendStatus(404));


// listen here
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log("Data server running on port", PORT));
