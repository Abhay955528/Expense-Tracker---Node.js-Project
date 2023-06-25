const express = require('express');
const router = express.Router();
const signControllers = require('../controller/signUp');

router.post("/signPage/user-add", signControllers.Addsign)

module.exports = router;
