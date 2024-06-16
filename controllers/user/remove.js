const User = require('../../models/user')

async function remove(req, res) {
    const id = req.params.id
    await User.findByIdAndDelete(id).exec()
    res.json({ message: 'Usuario elimindo exitosamente' })
}

module.exports = remove