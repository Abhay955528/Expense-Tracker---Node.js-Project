const User = require("../model/user");
const bcrypt = require("bcrypt");


function isstringinvalid(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

const Addsign = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log(name);
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
    bcrypt.hash(password, solt, async (err, hash) => {
      //** we use encrypt and we add some solt using hash
      const uId = await User.create({
        name,
        email,
        password: hash,
      });
      console.log(uId.id);
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
