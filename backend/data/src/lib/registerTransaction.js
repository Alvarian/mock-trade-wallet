const { Transactions } = require('../database/config');


module.exports = async function (userID, amount, symbol, total_price) {
    const isTransactionOk = await Transactions.create({
        data: {
            quantidy: amount, 
            symbol, 
            purchase_price: total_price,
            accountId: userID
        }
    });

    return isTransactionOk;
}