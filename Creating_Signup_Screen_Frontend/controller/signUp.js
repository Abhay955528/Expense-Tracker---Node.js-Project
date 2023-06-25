const sign = require('../model/signUp');

const Addsign = async (req, res, next) => {
    try {
  const Name = req.body.Name;
  const Email = req.body.Email;
  const Password = req.body.Password;
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
}

module.exports = {
Addsign
}