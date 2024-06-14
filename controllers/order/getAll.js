const Order = require('../../models/order');
const OrderDetails = require('../../models/orderDetails')
const User = require('../../models/user')

async function getAll(req, res) {
    try {
        let orders = await Order.find().populate([
            { path: 'user', select: '-password' },
            { path: 'details', populate: { path: 'product' } }
        ]);
        res.send(orders);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error getting orders' });
    }
}

module.exports = getAll;