const express = require('express');
const router = express.Router();

const preminumFeaturesControllers = require('../controller/premium');
const authenticateMiddleware = require('../middleware/auth');

router.get('/showLeaderBoard',authenticateMiddleware.authenticate,preminumFeaturesControllers.getLeaderBoard);


module.exports = router;