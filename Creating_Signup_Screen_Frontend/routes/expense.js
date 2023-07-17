const express = require("express");
const router = express.Router();
const userrauthentication = require("../middleware/auth");

const expenseControllers = require("../controller/expense");

router.get(
  "/download",
  userrauthentication.authenticate,
  expenseControllers.expenseDowanload
);
router.post(
  "/add-expense",
  userrauthentication.authenticate,
  expenseControllers.addExpense
);
router.get(
  "/get-expense",
  userrauthentication.authenticate,
  expenseControllers.getExpense
);
router.delete("/delete-expense/:id", expenseControllers.deleteExpense);

router.get("/load-data", userrauthentication.authenticate, expenseControllers.lodaData);

module.exports = router;
