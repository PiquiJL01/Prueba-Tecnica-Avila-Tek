const User = require('../../models/user')

async function getAll(req, res) {
    const users = await User.find().exec()
    res.json(users)
}

module.exports = getAll