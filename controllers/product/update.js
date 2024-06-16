const User = require('../../models/user')

async function update(req, res) {
    const id = req.params.id
    const product = await User.findByIdAndUpdate(id, req.body, { new: true }).exec()
    if (!product) {
        res.status(404).json({ message: 'Usuario no encontrado' })
    } else {
        res.json(product)
    }
}

module.exports = update