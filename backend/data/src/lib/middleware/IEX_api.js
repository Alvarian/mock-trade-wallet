// IEX API https://iexcloud.io/docs/api/

/*
   import axios
   env api url
*/
const axios = require('axios');
const logger = require('../logger');


// get all 
function allStocks(req, res, next) {
   // axios.get(process.env.IEX_API_URL+symbol+process.env.IEX_API_KEY)
   //    .then(response => console.log(response))
   //    .catch(error => console.log(error));

   next();
}

// get one
function oneStock(req, res, next) {
   axios.get(process.env.IEX_API_URL, {
      params: {
         symbols: req.query.symbol,
         types: 'quote',
         range: '1w',
         last: '5',
         token: process.env.IEX_API_KEY
      }
   })
      .then(response => {
         req.stocks = response.data[req.query.symbol.toUpperCase()].quote;
         next();
      })
      .catch(error => {
         logger.info("Error in iex api", error);
         res.sendStatus(400);
      });
}

module.exports = {
   allStocks,
   oneStock
}
