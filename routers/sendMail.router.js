const express = require('express');
const router = express.Router();

const sendMailController = require('../controllers/sendMail.controller.js')

router.route('/')
    .get(sendMailController.index)  // get all
    .post(sendMailController.sendMail) // 


module.exports = router;