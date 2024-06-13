const Order = require('../../models/order')

async function getAll(req, res) {
    try {
        const orders = await Order.find().populate('user', 'name email').populate('details', 'product quantity price');
        res.send(orders);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error getting orders' });
    }
}

module.exports = getAll