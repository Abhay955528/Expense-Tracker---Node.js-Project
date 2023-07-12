const express = require('express');
const router = express.Router();

const forgetpasswordMiddleware = require('../middleware/auth');
const forgetpasswordControllers = require('../controller/forgetPass');

// router.post('/',forgetpasswordControllers.forgetPassword);
router.post('/forgetpassword',forgetpasswordControllers.postForgetPassword);

module.exports = router;
