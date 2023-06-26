const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const signRoutes = require("./routes/signUp");
const loginRoutes = require("./routes/login");
const expenseRoutes = require('./routes/expense');
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(signRoutes);
app.use(loginRoutes);
app.use(expenseRoutes)

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
