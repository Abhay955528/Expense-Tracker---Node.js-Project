const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const userRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");
const expenseRoutes = require('./routes/expense');
const User = require('./model/user');
const Expense = require('./model/expense');
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(userRoutes);
app.use(loginRoutes);
app.use(expenseRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
