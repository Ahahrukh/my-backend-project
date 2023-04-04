const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
    planName: { type: String },
    Price: { type: Number },
    Totalincome: { type: Number },
    Completecycle: { type: Number },
    Dailyincome: { type: Number },
    phoneNumber: {
        type: Number, required: true
    },

});

const planModel = mongoose.model("plan", planSchema);

module.exports = planModel;
