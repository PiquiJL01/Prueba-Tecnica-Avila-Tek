const Order = require('../../models/order')
const Product = require('../../models/product')

async function remove(req, res) {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate('details');

        if (!order) {
            return res.status(404).send({ message: 'Order not found' });
        }

        switch (order.status) {
            case 'Processing':
                // Cancel order and restock products
                order.status = 'Cancelled';
                await Promise.all(order.details.map(async (detail) => {
                    const product = await Product.findById(detail.product);
                    product.stock += detail.quantity;
                    await product.save();
                }));
                await order.save();
                res.send({ message: 'Order cancelled successfully' });
                break;
            case 'In Transit':
            case 'Delivered':
                return res.status(400).send({ message: 'Too late to cancel order' });
            case 'Cancelled':
                return res.status(400).send({ message: 'Order is already cancelled' });
            default:
                return res.status(500).send({ message: 'Unknown order status' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error cancelling order' });
    }
}

module.exports = remove