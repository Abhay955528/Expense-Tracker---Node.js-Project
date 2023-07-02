const Expense = require("../model/expense");

const addExpense = async (req, res) => {
  try {
    const { money, description, category } = req.body;
    let uId = req.user.id;

    const eId = await Expense.create({
      amount: money,
      description: description,
      category: category,
      userId: uId,
    });
    // console.log('EXPENSE:id>>>>',eId.id);
    res.status(201).json({ newExpense: eId });
  } catch (err) {
    res.status(200).json({
      error: err,
    });
  }
};

const getExpense = async (req, res) => {
  try {
    const uId = await Expense.findAll({ where: { userId: req.user.id } });
    res.status(200).json({ allExpense: uId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const deleteExpense = async (req, res) => {
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
  addExpense,
  getExpense,
  deleteExpense,
};
