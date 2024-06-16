const Product = require('../../models/product')

async function remove(req, res) {
    const id = req.params.id
    await Product.findByIdAndDelete(id).exec()
    res.json({ message: 'Producto eliminado correctamente' })
}

module.exports = remove