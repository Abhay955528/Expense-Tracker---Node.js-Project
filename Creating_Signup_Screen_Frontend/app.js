const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const signRoutes = require("./routes/signUp");
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(signRoutes);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
