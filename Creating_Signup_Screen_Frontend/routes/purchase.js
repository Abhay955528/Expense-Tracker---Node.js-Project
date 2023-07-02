const express = require('express');
const router = express.Router();

const purchasepremiumControllers = require('../controller/purchase')
const authenticateMiddleware = require('../middleware/auth');

router.get('/purchase/premiummembership',authenticateMiddleware.authenticate,purchasepremiumControllers.purchasepremium);
router.post('/purchase/updatetransactionstatus',authenticateMiddleware.authenticate,purchasepremiumControllers.updatetransactionstatus)

module.exports = router;

