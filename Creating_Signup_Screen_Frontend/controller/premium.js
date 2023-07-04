const Expense = require("../model/expense");
const User = require("../model/user");
const database = require("../util/database");

exports.getLeaderBoard = async (req, res) => {
  try {
    const users = await User.findAll();
    const expenses = await Expense.findAll();
    const userAggregatedExpenses = {};
    expenses.forEach((result) => {
      if (userAggregatedExpenses[result.userId]) {
        userAggregatedExpenses[result.userId] += result.amount;
      } else {
        userAggregatedExpenses[result.userId] = result.amount;
      }
    });
    console.log(userAggregatedExpenses);

    const userLeaderBoardDeatils = [];
    users.forEach((user) => {
      userLeaderBoardDeatils.push({name: user.name,total_cost: userAggregatedExpenses[user.id]});
    });
    userLeaderBoardDeatils.sort((a,b)=>{
      b.total_cost-a.total_cost;
      console.log( b.total_cost-a.total_cost);
    })
    console.log(userLeaderBoardDeatils);
    res.status(200).json(userLeaderBoardDeatils);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
