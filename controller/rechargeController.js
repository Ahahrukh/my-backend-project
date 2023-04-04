const rechargeModel = require("../models/recharge.module");
const referralModel = require("../models/refrel.module");
const nodeCron = require("node-cron");
const recharge = async (req, res) => {
    const { amount } = req.body;
    const { phoneNumber } = req
    try {
        const recharge = await rechargeModel.find({ phoneNumber: req.phoneNumber });
        if (recharge?.length == 0) {
            var datas = new rechargeModel({
                phoneNumber: req.phoneNumber,
                assets: amount,
            });
            await datas.save();
        } else {
            var data = await rechargeModel.findOneAndUpdate(
                { phoneNumber },
                {
                    $inc: {
                        assets: amount,
                    },
                });
        }
        var refferdata;
        const { reffarreby } = await referralModel.findOne({ phoneNumber });
        refferdata = await referralModel.find({ referral_code: reffarreby });
        var rechargerefferral = await rechargeModel.find({
            phoneNumber: refferdata[0].phoneNumber,
        });

        if (rechargerefferral.length == 0) {
            var datas = new rechargeModel({
                phoneNumber: refferdata[0].phoneNumber,
                assets: amount * 0.25,
            });
            await datas.save();
        } else {
            var data = await rechargeModel.findOneAndUpdate(
                { phoneNumber: refferdata[0].phoneNumber },
                {
                    $inc: {
                        assets: amount * 0.25,
                    },
                }
            );
        }
        return res.send({ message: "recharge successful" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "internal server error" });
    }
};

const getwallet = async (req, res) => {
    try {
        const recharge = await rechargeModel.find({ phoneNumber: req.phoneNumber });
        if (recharge?.length == 0) {
            var datas = new rechargeModel({
                phoneNumber: req.phoneNumber,
            });
            await datas.save();
            return res.send([{
                phoneNumber: req.phoneNumber, rechargeAmount: 0,
                assets: 0,
                income: 0
            }]);
        } else {
            return res.send(recharge);
        }

    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: "internal server error" });
    }
}
const job = nodeCron.schedule("*/1 * * * * *", () => {
    alert(new Date().toLocaleString())
    console.log(new Date().toLocaleString());
});

module.exports = { recharge, getwallet };
