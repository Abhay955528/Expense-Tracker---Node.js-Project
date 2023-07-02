const express = require("express");
const router = express.Router();
const userrauthentication = require("../middleware/auth");

const expenseControllers = require("../controller/expense");

router.post("/expense/add-expense",userrauthentication.authenticate, expenseControllers.addExpense);

router.get("/expense/get-expense",userrauthentication.authenticate,expenseControllers.getExpense);
router.delete("/expense/delete-expense/:id", expenseControllers.deleteExpense);

module.exports = router;
