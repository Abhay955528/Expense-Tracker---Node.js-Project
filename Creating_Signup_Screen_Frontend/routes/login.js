const express = require("express");
const router = express.Router();

const loginControllers = require("../controller/login");

router.post('/user',loginControllers.logindata)

module.exports = router;
