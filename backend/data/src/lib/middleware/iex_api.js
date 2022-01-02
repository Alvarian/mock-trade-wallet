// IEX API https://iexcloud.io/docs/api/ && https://api.tiingo.com/documentation/iex

/*
   import axios
   env api url
*/
const axios = require('axios');
const logger = require('../logger');


// get all 
module.exports.searchStocks = function (req, res, next) {
   axios.get(process.env.TINGO_API_SEARCH_URL, {
      params: {
         query: req.query.symbol,
         limit: 20,
         token: process.env.TINGO_API_KEY
      }
   })
      .then(response => {
         req.stocks = response.data;
         
         next();
      })
      .catch(error => {
         logger.info("Error in tiingo api", error);

         res.sendStatus(404);
      });
}

// get one
module.exports.oneStock = function (req, res, next) {
   axios.get(process.env.TINGO_API_PROFILE_URL, {
      params: {
         tickers: req.query.symbol,
         token: process.env.TINGO_API_KEY
      }
   })
      .then(response => {
         req.stocks = response.data;
         
         next();
      })
      .catch(error => {
         logger.info("Error in tiingo api", error);

         res.sendStatus(404);
      });
}
