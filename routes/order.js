const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/order.controllers')

/**
 * @openapi
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: List of orders
 *       500:
 *         description: Internal Server Error
 */
router.get('/', OrderController.getAll)

/**
 * @openapi
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *                 description: User ID
 *               details:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       description: Product ID
 *                     quantity:
 *                       type: integer
 *                       description: Quantity
 *                     price:
 *                       type: number
 *                       description: Price
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal Server Error
 */
router.post('/', OrderController.create)

/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/:id', OrderController.get)

/**
 * @openapi
 * /api/orders/{id}:
 *   patch:
 *     summary: Update an order's status
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["Procesando", "En Transito", "Entregado", "Cancelado"]
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal Server Error
 */
router.patch('/:id', OrderController.updateOrderStatus)

//router.put('/:id', OrderController.update)

/**
 * @openapi
 * /api/orders/{id}:
 *   delete:
 *     summary: Cancel an order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Order ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order cancelled successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/:id', OrderController.cancel)

module.exports = router