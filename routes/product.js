const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/product.controllers')


router.get('/', ProductController.getAll)

router.post('/', ProductController.create)

router.get('/:id', ProductController.get)

router.put('/:id', ProductController.update)

router.delete('/:id', ProductController.remove)

module.exports = router