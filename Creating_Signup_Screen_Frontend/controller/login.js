const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateAccessToken(id,name,ispremiumuser) {
  return jwt.sign({ userId: id, name: name ,ispremiumuser}, "secretKey");
}

const logindata = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password);
    const user = await User.findAll({ where: { email } });
    if (user.length > 0) {
      console.log('USERID>>>',user[0].id);
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          throw new Error("Something went worng");
        }
        if (result === true) {
          res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: generateAccessToken(user[0].id,user[0].name,user[0].ispremiumuser)||0,
          });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "Password is incorrect" });
        }
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "User Doesnot exitst" });
    }
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
};

module.exports = {
  logindata,
  generateAccessToken
};
