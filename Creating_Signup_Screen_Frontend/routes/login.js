const express = require("express");
const router = express.Router();
const userrauthentication = require("../middleware/auth");
const loginControllers = require("../controller/login");

router.post('/login/user',loginControllers.logindata)

module.exports = router;
