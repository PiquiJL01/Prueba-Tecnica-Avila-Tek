const Product = require('../../models/product')

async function create(req, res) {
    const product = new Product(req.body)
    try {
        await product.save()
        res.json(product)
    } catch (err) {
        res.status(400).json({ message: 'Error creating product' })
    }
}

module.exports = create