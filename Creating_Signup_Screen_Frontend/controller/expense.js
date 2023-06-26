const Expense = require("../model/expense");

const addExpense = async (req, res, enxt) => {
    try {
      const Amount = req.body.Fmoney;
      const Descripition = req.body.Fdescription;
      const Category = req.body.Fcategory;
  
      const uId = await Expense.create({
        amount: Amount,
        descripiton: Descripition,
        category: Category,
      });
      res.status(201).json({ newExpense: uId });
    } catch (err) {
      res.status(200).json({
        error: err,
      });
    }
  };
  
  const getExpense = async (req, res, next) => {
    try {
      console.log(Expense);
      const data = await Expense.findAll();
      res.status(200).json({ allExpense: data });
    } catch (error) {
      console.log((error));
      res.status(500).json({ error: error });
    }
  };
  
  const deleteExpense = async (req, res, next) => {
    try {
      const uId = req.params.id;
      await Expense.destroy({ where: { id: uId } });
      res.sendStatus(200).json;
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  };
  

module.exports = {
  addExpense,getExpense,deleteExpense
};
