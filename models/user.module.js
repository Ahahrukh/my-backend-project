const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   phoneNumber: {
      type: String, required: true,
      unique: true
   },
   logPassword: { type: String, required: true, trim: true },
   withdrawalPassword: { type: String, required: true, trim: true },
   referral_code: { type: String },
   role: { type: String, default: "user" },
   validuser: { type: Boolean, default: "false" },
   timestamp: {
      type: Date,
      default: Date.now(),
   },
   refId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "referral"
   },
   walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wallet"
   },
   plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plan"
   },
   wallet:{type:Number,default:100},
   recharge:{type:Number}

});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
