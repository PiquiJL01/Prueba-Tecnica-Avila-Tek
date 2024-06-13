const User = require('../../models/user')

async function update(req, res) {
    const id = req.params.id
    const user = await User.findByIdAndUpdate(id, req.body, { new: true }).exec()
    if (!user) {
        res.status(404).json({ message: 'User not found' })
    } else {
        res.json(user)
    }
}

module.exports = update