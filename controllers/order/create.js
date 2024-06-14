const Order = require('../../models/order')
const OrderDetails = require('../../models/orderDetails')
const Product = require('../../models/product')
const User = require('../../models/user')

async function create(req, res) {
    try {
        const user = req.body.user;
        const details = req.body.details;

        // Check if the user exists
        const userDoc = await User.findById(user);
        if (!userDoc) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Create a new order
        const order = new Order({ user, status: 'Processing' });

        // Create order details and update product quantities
        const orderDetailsPromises = details.map(async (detail) => {
            const product = await Product.findById(detail.product);
            if (!product) {
                throw new Error(`Product not found: ${detail.product}`);
            }

            if (product.stock < detail.quantity) {
                throw new Error(`Not enough stock for product ${product.name}. Available: ${product.stock}, Ordered: ${detail.quantity}`);
            }

            // Update product quantity
            product.stock -= detail.quantity;
            await product.save();

            // Create order detail
            const orderDetail = new OrderDetails({ product: product._id, order: order._id, quantity: detail.quantity, price: detail.price });
            await orderDetail.save();

            // Add order detail to order
            order.details.push(orderDetail._id);
        });

        // await OrderDetails and save order
        await Promise.all(orderDetailsPromises);
        await order.save();

        // Populate order details
        const populatedOrder = await order.populate([
            { path: 'user' },
            { path: 'details', populate: { path: 'product' } }
        ])

        res.status(201).send(populatedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: err.message });
    }
}

module.exports = create;

module.exports = create