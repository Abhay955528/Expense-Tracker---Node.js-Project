const sign = require("../model/signUp");

const logindata = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(password);
  await sign
    .findAll({ where: { email } })
    .then((response) => {
      if (response.length > 0) {
          if (response[0].password === password) {
            console.log(response[0].password );
          res
            .status(200)
            .json({ success: true, message: "User logged in successfully" });
        } else {
          return res
            .status(400)
            .json({ success: false, message: "Password is incorrect" });
        }
      } else {
        return res
          .status(400)
          .json({ success: false, message: "User Doesnot exitst" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error, success: false });
    });
};

module.exports = {
  logindata,
};
