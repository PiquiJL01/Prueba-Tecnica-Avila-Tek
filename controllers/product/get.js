const Product = require('../../models/product')

async function get(req, res) {
    const id = req.params.id
    const product = await Product.findById(id).exec()
    if (!product) {
        return res.status(404).json({ message: 'Product not found' })
    } else {
        res.json(product)
    }
}

module.exports = get