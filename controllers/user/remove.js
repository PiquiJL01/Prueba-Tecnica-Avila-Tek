const User = require('../../models/user')

async function remove(req, res) {
    const id = req.params.id
    await User.findByIdAndDelete(id).exec()
    res.json({ message: 'User deleted successfully' })
}

module.exports = remove