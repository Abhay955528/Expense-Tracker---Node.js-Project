const Expense = require("../model/expense");
const User = require("../model/user");
const sequelize = require("../util/database");

const addExpense = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { money, description, category } = req.body;

    if (money == undefined || money.length === 0) {
      res.status(400).json({ success: false, message: "Parameters Missing" });
    }

    const result = await Expense.create({
      amount: money,
      description: description,
      category: category,
      userId: req.user.id,
    });

    const user = await User.findOne({
      where: { id: req.user.id },
      transaction: t,
    });
    user.totalExpense = Number(user.totalExpense) + Number(money);

    res.status(201).json({ newExpense: result });
    await user.save();
    await t.commit();
  } catch (err) {
    await t.rollback();
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
  const t = await sequelize.transaction();
  try {
    const uId = req.params.id;
    const expense = await Expense.findByPk(uId);
    await Expense.destroy({ where: { id: uId } });
    // console.log(expense);
    const user = await User.findByPk(expense.userId);
    // console.log(user);
    user.totalExpense = Number(user.totalExpense) - Number(expense.amount);
    await user.save({ transaction: t });
    await Expense.destroy({ where: { id: uId }, transaction: t });
    await t.commit();
    res.sendStatus(201).json;
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
