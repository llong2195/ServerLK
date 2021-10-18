const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category.controller.js')

router.route('/')
    .get(categoryController.index)
    .post(categoryController.newCategory)

router.route('/:id')
    .get(categoryController.getCategory)
    .patch(categoryController.updateCategory)
    .delete(categoryController.deleteCategory)

module.exports = router;