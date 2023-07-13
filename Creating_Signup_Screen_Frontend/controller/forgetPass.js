const nodemailer = require("nodemailer");
const uuid = require("uuid");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const ForgetPassword = require("../model/forgetPass");

require("dotenv").config();

const forgetpassword = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const forgetpasswordcreate = await ForgetPassword.create({
        id: uuid.v4(),
        isActive: true,
        userId: user.id,
      });
      const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: "av6274962@gmail.com",
          pass: "vruvfsawamvdvquw",
        },
      });

      const response = await transporter.sendMail({
        from: "av6274962@gmail.com", // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "and easy to do anywhere, even with Node.js", // plain text body
        html: `<a href="http://localhost:3000/password/resetpassword/${forgetpasswordcreate.id}">Reset password</a>`, // html body
      });

      await transporter.sendMail(response);
      res.status(202).json({
        message: "Link to reset password sent to  your mail",
        sucess: true,
      });
    } else {
      throw new Error("User doesnt exist");
    }
  } catch (err) {
    // console.log(err);
    res.status(401).json({ err: err });
  }
};

const resetpassword = async (req, res) => {
  try {
    const forgetpasswordId = req.params.id;
    const forgetpassword = await ForgetPassword.findByPk(forgetpasswordId);
    if (forgetpassword) {
      await forgetpassword.update({ isActive: false });
      res.status(202).send(`<html>
  <script>
      function formsubmitted(e){
          e.preventDefault();
          console.log('called')
      }
  </script>
  <form action="/password/updatepassword/${forgetpasswordId}" method="get">
      <label for="newpassword">Enter New password</label>
      <input name="newpassword" type="password" required></input>
      <button>reset password</button>
  </form>
</html>`);
      res.end();
    } else {
      throw new Error("User doesnt exist");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: error });
  }
};

const updatepassword = async (req, res) => {
  try {
    const id = req.params.id;
    const newpassword = req.query.newpassword;
    const details = await ForgetPassword.findByPk(id);
    const user = await User.findByPk(details.userId);
    console.log('86',user);
    if (user) {
      const soltRoute = 10;
      bcrypt.hash(newpassword, soltRoute, async (error, hash) => {
        if(error) {
          console.log();
        }
        console.log('hash',hash);
        const passwordUpdate = await user.update({password:{hash}});
        console.log('94',passwordUpdate);
        res.status(201).json({massge:'password updated successfully'});
      });
    } else {
      throw new Error("User doesnt exist");
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({ error, sucess: false });
  }
};

module.exports = {
  forgetpassword,
  resetpassword,
  updatepassword,
};
