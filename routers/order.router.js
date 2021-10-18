const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller.js')

router.route('/')
    .get(orderController.index)
    .post(orderController.newOrder)

router.route('/:id')
    .get(orderController.getOrder)
    .patch(orderController.updateOrder)
    .delete(orderController.deleteOrder)

router.route('/:id/sendmail')
    .get(orderController.sendMail)
module.exports = router;