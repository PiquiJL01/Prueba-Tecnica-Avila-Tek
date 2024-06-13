const mongoose = require('mongoose')

mongoose.connect(process.env.dbConnection)

const orderSchema = new mongoose.Schema({
    status: "Processing" | "In Transit" | "Delivered",
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    details: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderDetails' }]
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order