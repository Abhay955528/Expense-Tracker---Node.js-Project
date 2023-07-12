const nodemailer = require("nodemailer");

exports.postForgetPassword = async (req, res, next) => {
  try {
    const email = req.body.email;

    const transporter = nodemailer.createTransport({
      service:'gmail',
      secure: true,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'av6274962@gmail.com',
        pass: 'vruvfsawamvdvquw'
      }
    });

    const info = await transporter.sendMail({
      from: 'av6274962@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Testing our Nodemailer", // plain text body
      html: "<b>Testing our Nodemailer is first time</b>", // html body
    });

    res
      .status(202)
      .json({info});
  } catch (err) {
    console.log(err);
    res.status(401).json({err:err})
  }
};
