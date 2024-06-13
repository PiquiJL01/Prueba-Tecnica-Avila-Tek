const Product = require('../../models/product')

async function getAll(req, res) {
    const products = await Product.find().exec()
    res.json(products)
}

module.exports = getAll