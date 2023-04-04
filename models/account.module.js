const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    Name: { type: String },
    phoneNumber: { type: Number },
    bankaccount: { type: Number },
    bankname: { type: String },
    ifsc: { type: String },
    withdrawlpassword: { type: String },
    user_id: {
        type: String
    },
});

const accountModel = mongoose.model("account", accountSchema);

module.exports = accountModel;
