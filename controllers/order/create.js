const Order = require('../../models/order')
const OrderDetails = require('../../models/orderDetails')
const Product = require('../../models/product')
const User = require('../../models/user')

async function create(req, res) {
    let customError = false
    try {
        const user = req.body.user;
        const details = req.body.details;

        // Chequear si el usuario existe
        const userDoc = await User.findById(user);
        if (!userDoc) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        // Crear una nueva orden
        const order = new Order({ user, status: 'Procesando' });
        await order.save()

        // Crea los detalles de las ordenes y actualiza el stock
        const orderDetailsPromises = details.map(async (detail) => {
            const product = await Product.findById(detail.product);
            if (!product) {
                customError = true
                throw new Error(`Producto no encontrado: ${detail.product}`);
            }

            if (product.stock < detail.quantity) {
                customError = true
                throw new Error(`No hay suficiente stock de ${product.name}. Disponible: ${product.stock}, Pedido: ${detail.quantity}`);
            }

            // Actualiza las cantidades en el stock
            product.stock -= detail.quantity;
            await product.save();

            // Crea los detalles de la orden
            const orderDetail = new OrderDetails({ product: product._id, order: order._id, quantity: detail.quantity, price: detail.price });
            await orderDetail.save();

            // Agrega el detalle a la orden
            order.details.push(orderDetail._id);
            await order.save()
        });

        // Espera de la creacion de todos los OrderDetails
        await Promise.all(orderDetailsPromises);

        // Poblar los campos con referencias
        const populatedOrder = await order.populate([
            { path: 'user', select: '-password' },
            { path: 'details', populate: { path: 'product' } }
        ])

        res.status(201).send(populatedOrder);
    } catch (err) {
        res.status(500).send({ message: customError ? err.message : 'Error al crear la orden' });

    }
}

module.exports = create;

module.exports = create