const sign = require("../model/signUp");

const Addsign = async (req, res, next) => {
  try {
    const { Name, Email, Password } = req.body;
    const uId = await sign.create({
      name: Name,
      email: Email,
      password: Password,
    });
    res.status(200).json({ newSignUp: uId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

module.exports = {
  Addsign,
};
