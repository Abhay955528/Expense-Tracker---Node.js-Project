const Expense = require("../model/expense");
const User = require("../model/user");
const Sequelize = require("../util/database");
const UserService = require("../service/userservice");
const S3Service = require("../service/s3service");
const DownloadUrl = require("../model/downloadurl");

const expenseDowanload = async (req, res) => {
  try {
    const t = await Sequelize.transaction();
    const expense = await Expense.findAll({ where: { userId: req.user.id } });
    const expenseStrngify = JSON.stringify(expense);

    // It should dependfd upon the user id
    const userId = req.user.id;

    const fileName = `Expense${userId}${new Date()}.txt`;
    const fileURL = await S3Service.uploadTOS3(expenseStrngify, fileName);
    console.log(fileURL);
    // const data = await DownloadUrl.create({
    //   downloadUrl:fileURL,
    // });
    res.status(200).json({ fileURL, success: true });
    await t.commit();
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.status(500).json({ fileURL: "", success: false, err: error });
  }
};

const addExpense = async (req, res) => {
  const t = await Sequelize.transaction();
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
  const t = await Sequelize.transaction();
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

const lodaData = async (req, res) => {
  try {
    const t = await Sequelize.transaction();
    let page = req.params.page || 1;
    const pageSize = +req.query.pagesize || 5;
    let totalexpense = await Expense.count();
    let expenses = await Expense.findAll(
      { where: { userId: req.user.id } },
      {
        offset: (page - 1) * expensePerPage,
        limit: expensePerPage,
      }
    );
    res.status(201).json({
      expenses: expenses,
      currentPage: page,
      hasNextPage: page * expensePerPage < totalexpense,
      nextPage: page + 1,
      hasPreviousPage: page > 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalexpense / expensePerPage),
    });
    await t.commit();
  } catch (err) {
    await t.rollback();
    console.log(err);
  }
};

module.exports = {
  addExpense,
  getExpense,
  deleteExpense,
  expenseDowanload,
  lodaData,
};
