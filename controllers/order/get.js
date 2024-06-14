const Order = require('../../models/order')

async function get(req, res) {
    try {
        const order = await Order.findById(req.params.id).populate([
            { path: 'user', select: '-password' },
            { path: 'details', populate: { path: 'product' } }
        ]);
        if (!order) {
            res.status(404).send({ message: 'Order not found' });
        } else {
            res.send(order);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error getting order' });
    }
}

module.exports = get