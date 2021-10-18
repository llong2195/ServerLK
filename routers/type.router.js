const express = require('express');
const router = express.Router();

const typeController = require('../controllers/type.controller.js')

router.route('/')
    .get(typeController.index)
    .post(typeController.newType)

router.route('/:id')
    .get(typeController.getType)
    .patch(typeController.updateType)
    .delete(typeController.deleteType)

module.exports = router;