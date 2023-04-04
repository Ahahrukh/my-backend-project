const jwt = require("jsonwebtoken");
const bycrpt = require("bcrypt");
var shortid = require("shortid");
const UserModel = require("../models/user.module");
const referralModel = require("../models/refrel.module");
const { v4: uuidv4 } = require('uuid');
const Register = async (req, res) => {
  const { phoneNumber, logPassword, withdrawalPassword, frontreferral_code } = req.body;
  let referral_code = shortid.generate();
  const adminNumber = "7579014205";
  var anyrole = phoneNumber === adminNumber ? "admin" : "user";
  try {
    const checkuser = await UserModel.findOne({ phoneNumber });
    if (checkuser) {
      return res.status(500).send({ message: "this user already exist" });
    }
    var hashlog = await bycrpt.hash(logPassword, 10);
    const user = new UserModel({
      phoneNumber,
      logPassword: hashlog,
      withdrawalPassword,
      referral_code,
      role: anyrole,
    });

    await user.save();
    const refrel = await new referralModel({
      phoneNumber,
      referral_code: referral_code,
      reffarreby: frontreferral_code,
      time_added: Date.now(),
      status: true,
    });
    await refrel.save();


    const reffarreby = await referralModel.findOne({ referral_code: frontreferral_code, status: true });


    // if (!reffarreby) {
    //  res.status(400).send({ error: "invalid referrel code" });
    // }
    var t = await referralModel.findOneAndUpdate({ "referral_code": frontreferral_code }, {
      $push: {
        "referraluser": { _id: uuidv4(), "phoneNumber": phoneNumber, create_at: new Date().toLocaleString() }
      },
      $inc: { 'referralCount': 1 }
    }
    );


    return res.send({
      message: "Registration successful",
      referral_code: referral_code,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send({ error: error });
  }
};
const Login = async (req, res) => {
  const { phoneNumber, logPassword } = req.body;
  const user = await UserModel.findOne({ phoneNumber });
  const hash = user?.logPassword;
  console.log(user)
  bycrpt.compare(logPassword, hash, function (err, result) {
    if (err) {
      return res.send({ message: "Use right credentials", status: "401" });
    }
    if (result) {
      var token = jwt.sign(
        { userId: user._id, phoneNumber: user.phoneNumber, role: user.role, wallet: user.wallet },
        "secret"
      );
      if (user.length == 0) {
        return res.send({ error: "invalid credentials" });
      }
      let decoded = jwt.verify(token, "secret")
      return res.send({ message: "Login successful", token: token, role: user.role, Decoded: decoded });
    }
  });
};

module.exports = {
  Register,
  Login,
};
