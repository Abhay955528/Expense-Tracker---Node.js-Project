const express = require("express");
const app = express();
require('dotenv').config();

const bodyParser = require("body-parser");
const sequelize = require("./util/database");

//**  routes
const userRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");
const expenseRoutes = require('./routes/expense');
const purchaesRoutes = require('./routes/purchase');

//**  model
const User = require('./model/user');
const Expense = require('./model/expense');
const Order = require('./model/order')

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(userRoutes);
app.use(loginRoutes);
app.use(expenseRoutes);
app.use(purchaesRoutes); 

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

sequelize
  .sync(5555)
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
