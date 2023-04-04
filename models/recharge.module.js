const { string } = require("assert-plus");
const mongoose = require("mongoose");

const RechargeSchema = new mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true
    },

    rechargeAmount: {
        type: Number,
        default: 0,
        minimum: 400
    },
    assets: {
        type: Number,
        default: 100
    },
    income: {
        type: Number,
        default: 0
    }

});

const rechargeModel = mongoose.model("wallet", RechargeSchema);

module.exports = rechargeModel;
