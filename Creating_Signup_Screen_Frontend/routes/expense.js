const express = require("express");
const router = express.Router();
const userrauthentication = require("../middleware/auth");

const expenseControllers = require("../controller/expense");

router.post("/add-expense",userrauthentication.authenticate, expenseControllers.addExpense);
router.get("/get-expense",userrauthentication.authenticate,expenseControllers.getExpense);
router.delete("/delete-expense/:id", expenseControllers.deleteExpense);

module.exports = router;
