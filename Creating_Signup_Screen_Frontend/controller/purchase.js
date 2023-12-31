const Razorpay = require("razorpay");
const Order = require("../model/order");
const jwt = require("jsonwebtoken");

const purchasepremium = async (req, res) => {
  try {
    const rzp = new Razorpay({
      key_id: process.env.RAZARPAY_KEY_ID,
      key_secret: process.env.RAZARPAY_KEY_SECREAT,
    });
    const amount = 2500;

    //* orders and createOrder is razarPay function

    const order = await rzp.orders.create({ amount, currency: "INR" });
    await req.user.createOrder({ orderid: order.id, status: "PENDING" });
    return res.status(201).json({ order, key_id: rzp.key_id });
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "Something went wong", error: error });
  }
};

function generateAccessToken(id, name, ispremiumuser) {
  return jwt.sign({ userId: id, name: name, ispremiumuser }, "secretKey");
}

const updatetransactionstatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ where: { orderid: order_id } });
    order.paymentid = payment_id;
    order.status = "SUCCESS";
    await order.save();
    req.user.update({ ispremiumuser: true });
    res
      .status(201)
      .json({
        message: "transition Successfull",
        token: generateAccessToken(req.user.id,req.user.name ,true),
      });
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  purchasepremium,
  updatetransactionstatus,
};
