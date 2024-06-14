const db = require('./db')

const productSchema = new db.mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true }
})

const Product = db.mongoose.model(db.models.Product, productSchema)

module.exports = Product