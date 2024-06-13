const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/order.controllers')


router.get('/', OrderController.getAll)

router.post('/', OrderController.create)

router.get('/:id', OrderController.get)

router.patch('/:id', OrderController.updateOrderStatus)

//router.put('/:id', OrderController.update)

router.delete('/:id', OrderController.remove)

module.exports = router