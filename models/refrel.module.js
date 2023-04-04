const mongoose = require("mongoose");
const refrelSchema = new mongoose.Schema({
   phoneNumber: {
      type: Number, required: true
   },
   referral_code: {
      type: String,
      required: true
   },
   reffarreby: {
      type: String,
      required: true
   },

   time_added: { type: Date, default: new Date() },
   status: {
      type: Boolean
   },
   referralCount: {
      type: Number,
      default: 0
   },
   walletId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wallet"
   },
   referraluser: { type: Array }

});

const referralModel = mongoose.model("referral", refrelSchema);

module.exports = referralModel;
