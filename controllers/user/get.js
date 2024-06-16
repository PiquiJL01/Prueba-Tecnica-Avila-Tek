const User = require('../../models/user')

async function get(req, res) {
    const id = req.params.id
    const user = await User.findById(id).exec()
    if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' })
    } else {
        res.json(user)
    }
}

module.exports = get