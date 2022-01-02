const jwt = require('jsonwebtoken');

module.exports = (token, id) => new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err || decoded !== id) return reject(err);
        
        return resolve(decoded);
    });
});