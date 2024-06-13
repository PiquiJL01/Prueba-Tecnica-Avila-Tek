const Order = require('../../models/order')

async function updateOrderStatus(req, res) {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            res.status(404).send({ message: 'Order not found' });
        } else {
            order.status = req.body.status;
            await order.save();
            res.send(order);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error updating order' });
    }
}

module.exports = updateOrderStatus