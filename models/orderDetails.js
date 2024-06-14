const db = require('./db')

const orderDetailsSchema = new db.mongoose.Schema({
    product: { type: db.mongoose.Schema.Types.ObjectId, ref: db.models.Product, required: true },
    order: { type: db.mongoose.Schema.Types.ObjectId, ref: db.models.Order, required: true },
    quantity: { type: Number, required: true }
})

const OrderDetails = db.mongoose.model(db.models.OrderDetails, orderDetailsSchema)

module.exports = OrderDetails