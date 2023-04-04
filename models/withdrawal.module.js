const mongoose = require("mongoose");

const withdrawalSchema = new mongoose.Schema({

    user_id: {
        type: String, required: true
    },
    amount: {
        type: Number, required: true
    },
    status: {
        type: String,
        default: 'pending',
    },
    admin_id: {
        type: String
    },
    timestamp: {
        type: Date,
        default: new Date(),
    },
    phoneNumber: {
        type: Number
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account"
    },
});

const withdrawalModel = mongoose.model("Withdrawal", withdrawalSchema);

module.exports = withdrawalModel;
