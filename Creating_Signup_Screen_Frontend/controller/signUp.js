const sign = require("../model/signUp");
const bcrypt = require("bcrypt");

function isstringinvalid(string) {
  if (string == undefined || string === 0) {
    return true;
  } else {
    return false;
  }
}

const Addsign = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (
      isstringinvalid(name) ||
      isstringinvalid(email) ||
      isstringinvalid(password)
    ) {
      return res
        .status(400)
        .json({ err: "Bad Parameters . Something is missing" });
    }
    let solt = 10;
    const uId = bcrypt.hash(password, solt, async (err, hash) => {
      console.log(hash);
      await sign.create({
        name,
        email,
        password: hash,
      });
      res.status(201).json({ message: "Successfuly create new user" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

module.exports = {
  Addsign,
};
