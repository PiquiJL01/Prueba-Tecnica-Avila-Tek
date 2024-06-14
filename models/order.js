const db = require('./db')

const orderSchema = new db.mongoose.Schema({
    status: {
        type: String,
        enum: ["Processing", "In Transit", "Delivered", "Cancelled"],
        required: true
    },
    user: { type: db.mongoose.Schema.Types.ObjectId, ref: db.models.User, required: true },
    details: [{ type: db.mongoose.Schema.Types.ObjectId, ref: db.models.OrderDetails }]
})
const Order = db.mongoose.model(db.models.Order, orderSchema)

module.exports = Order