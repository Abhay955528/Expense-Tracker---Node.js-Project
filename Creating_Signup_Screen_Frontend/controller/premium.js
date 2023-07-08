const Expense = require("../model/expense");
const User = require("../model/user");
const sequelize = require("../util/database");
const database = require("../util/database");

exports.getLeaderBoard = async (req, res) => {
  try {
    //? SQL Joins left join(Uses to Expense)

    const leaderBoaderofusers = await User.findAll({
      attributes: [
        "id",
        "name",
        [sequelize.fn("sum", sequelize.col("amount")), "total_cost"],
      ],
      include: [
        {
          model: Expense,
          attributes: [],
        },
      ],
      group: ["id"],
      order: [["total_cost", "DESC"]],
    });
    // console.log(leaderBoaderofusers);

    //* use this type model and find particuler value
    // const expenses = await Expense.findAll({
    //   attributes: [
    //     "userId",
    //     [sequelize.fn("sum", sequelize.col("amount")), "total_cost"],
    //   ],
    //   group: ["userId"],
    // });
    res.status(200).json(leaderBoaderofusers);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
