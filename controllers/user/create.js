const User = require('../../models/user')

async function create(req, res) {
    const user = new User(req.body)
    try {
        await user.save()
        res.json(user)
    } catch (err) {
        res.status(400).json({ message: 'Error creando el usuario' })
    }
}

module.exports = create