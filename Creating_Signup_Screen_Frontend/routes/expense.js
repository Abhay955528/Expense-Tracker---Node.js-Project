const express = require("express");
const router = express.Router();

const expenseControllers = require('../controller/expense');

router.get('/expense/add-expense',expenseControllers.addExpense);

router.delete('/expense/get-expense',expenseControllers.getExpense);
router.delete('/expense/delete-expense',expenseControllers.deleteExpense);

module.exports = router;
