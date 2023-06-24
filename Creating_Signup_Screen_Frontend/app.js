const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const sign = require("./model/signUp");
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());

app.post("/signPage/user-add", async (req, res, next) => {
  //   try {
  const Name = req.body.Name;
  const Email = req.body.Email;
  const Password = req.body.Password;
  const uId = await sign.create({
    name: Name,
    email: Email,
    password: Password,
  });
  console.log(uId);
  res.status(200).json({ newSignUp: uId });
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: error });
  //   }
});


sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
