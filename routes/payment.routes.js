const express = require('express')

const paymentRouter = express.Router();
const Razorpay = require('razorpay')
paymentRouter.post('/payment', async (req, res) => {
  var instance = new Razorpay({
    key_id: 'rzp_test_OCuhxojsa984jd',
    key_secret: 'jWV74XniMcShPVMEG365u2qV',
  });
  var amount = req.body.amount;
  try {
    let order = await instance.orders.create({
      amount: amount * 100,  // amount in the smallest currency unit
      currency: "INR",
    })
    res.send({ message: order, status: "Success" });
  } catch (error) {
    res.send({ message: "internal error" })
  }
})

module.exports = paymentRouter