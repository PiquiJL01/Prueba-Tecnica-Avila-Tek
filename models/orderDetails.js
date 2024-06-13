const mongoose = require('mongoose')

mongoose.connect(process.env.dbConnection)

const orderSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    quantity: Number,
})

const OrderDetails = mongoose.model('OrderDetails', orderSchema)

module.exports = OrderDetails