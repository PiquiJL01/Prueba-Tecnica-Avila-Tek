const Order = require('../../models/order')
const Product = require('../../models/product')

async function cancel(req, res) {
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId).populate('details');

        if (!order) {
            return res.status(404).send({ message: 'Orden no encontrada' });
        }

        switch (order.status) {
            case 'Procesando':
                // Cancelar la orden y se hace el restock de los productos
                order.status = 'Cancelado';
                await Promise.all(order.details.map(async (detail) => {
                    const product = await Product.findById(detail.product);
                    product.stock += detail.quantity;
                    await product.save();
                }));
                await order.save();
                res.send({ message: 'Orden cancelada exitosamente' });
                break;
            case 'En Transito':
            case 'Entregado':
                // La orden no puede ser cancelada
                return res.status(400).send({ message: 'Ya no se puede cancelar la orden' });
            case 'Cancelado':
                // La orden ya fue cancelada
                return res.status(400).send({ message: 'La orden ya fue cancelada' });
            default:
                // Mensaje en caso de estado no definido
                return res.status(500).send({ message: 'Estatus de la orden desconocido' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Error cancelando la orden' });
    }
}

module.exports = cancel