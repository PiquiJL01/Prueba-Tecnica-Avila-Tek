const mongoose = require('mongoose')

mongoose.connect(process.env.dbConnection)

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product