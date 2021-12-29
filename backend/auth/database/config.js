// redis https://gist.github.com/bradtraversy/a9dedcdf4350fd417819ee6538482aae

// mongoose https://www.youtube.com/watch?v=fgTGADljAeg

/*
    import redis
    import mongoose

    use redis
    use mongoose
*/
const redis = require('redis');
const mongoose = require('mongoose');


module.exports = {
    db: () => {
        mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
        const db = mongoose.connection;
        db.on('error', (error) => console.error(error));
        db.once('open', () => console.log('Connected to Database'));
    },
    cache: () => {
        const REDIS_PORT = process.env.REDIS_PORT || 6379;
        const client = redis.createClient(REDIS_PORT);
        console.log("Connected to Cache");

        return client;
    }
}