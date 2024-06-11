const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controllers')


router.get('/', UserController.getAll);

router.post('/', UserController.create);

router.get('/:id', UserController.get);

router.put('/:id', UserController.update);

router.delete('/:id', UserController.remove);

module.exports = router;