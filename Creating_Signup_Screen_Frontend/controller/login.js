const sign = require("../model/signUp");
const bcrypt = require("bcrypt");

const logindata = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(password);
    const user = await sign.findAll({ where: { email } });
    console.log(user);
    if (user.length > 0) {
      bcrypt.compare(password,user[0].password,(err,result)=>{
        if(err) {
          throw new Error('Something went worng')
        }
        if (result === true) {
          res.status(200).json({ success: true, message: "User logged in successfully" });
        } else {
          return res.status(400).json({ success: false, message: "Password is incorrect" });
        }
      })
    } else {
      return res.status(400).json({ success: false, message: "User Doesnot exitst" });
    }
  } catch (error) {
    res.status(500).json({ message: error, success: false });
  }
};

module.exports = {
  logindata,
};
