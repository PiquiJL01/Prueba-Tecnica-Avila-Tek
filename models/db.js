const mongoose = require('mongoose');
const models = {
    Order: 'Order',
    OrderDetails: 'OrderDetails',
    Product: 'Product',
    User: 'User',
}

mongoose.connect(process.env.dbConnection);

module.exports = { mongoose, models };