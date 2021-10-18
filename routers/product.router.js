const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller.js')

router.route('/')
    .get(productController.index)
    .post(productController.newProduct)

router.route('/:id')
    .get(productController.getProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)

router.route('/:id/cmt')
    .post(productController.newComment)

module.exports = router;