const User = require('../models/user')

async function getAll(req, res) {
    const users = await User.find().exec();
    res.json(users);
}

async function create(req, res) {
    const user = new User(req.body);
    try {
        await user.save();
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: 'Error creating user' });
    }
}

async function get(req, res) {
    const id = req.params.id;
    const user = await User.findById(id).exec();
    if (!user) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(user);
    }
}

async function update(req, res) {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true }).exec();
    if (!user) {
        res.status(404).json({ message: 'User not found' });
    } else {
        res.json(user);
    }
}

async function remove(req, res) {
    const id = req.params.id;
    await User.findByIdAndRemove(id).exec();
    res.json({ message: 'User deleted' });
}

module.exports = {
    getAll,
    create,
    get,
    update,
    remove
}