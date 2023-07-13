const express = require('express');
const router = express.Router();

const resetpasswordController = require('../controller/forgetPass');

router.post('/forgetpassword',resetpasswordController.forgetpassword);
router.get('/updatepassword/:id', resetpasswordController.updatepassword);
router.get('/resetpassword/:id', resetpasswordController.resetpassword);

module.exports = router;
