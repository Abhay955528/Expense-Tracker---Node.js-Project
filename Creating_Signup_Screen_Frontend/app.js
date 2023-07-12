const express = require("express");
const app = express();
require('dotenv').config();

const bodyParser = require("body-parser");
const sequelize = require("./util/database");

//**  routes
const signRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");
const expenseRoutes = require('./routes/expense');
const purchaesRoutes = require('./routes/purchase');
const preminumRoutes = require('./routes/premium');
const forgetpasswordRoutes = require('./routes/forgetPass');

//**  model
const User = require('./model/user');
const Expense = require('./model/expense');
const Order = require('./model/order');
const Forget = require('./model/forgetPass');

const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(signRoutes);
app.use('/login',loginRoutes);
app.use('/expense',expenseRoutes);
app.use('/purchase/',purchaesRoutes); 
app.use('/premium',preminumRoutes);
app.use('/password',forgetpasswordRoutes)

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forget);
Forget.belongsTo(User);

sequelize
  // .sync({force:true})
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
