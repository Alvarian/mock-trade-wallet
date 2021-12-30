const bunyan = require('bunyan');
const path = require('path');


module.exports = bunyan.createLogger({
    name: "auth API",
    streams: [
        {
            level: "info",
            stream: process.stdout
        },
        {
            level: "info",
            path: path.resolve(__dirname, "..", "..", "logs.json")
        }
    ]
});