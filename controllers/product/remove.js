const Product = require('../../models/product')

async function remove(req, res) {
    const id = req.params.id
    await Product.findByIdAndDelete(id).exec()
    res.json({ message: 'Product deleted successfully' })
}

module.exports = remove