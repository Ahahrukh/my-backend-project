const referralModel = require("../models/refrel.module");


const Referral = async (req, res) => {
    const { phoneNumber, referral_code } = req.body;
    try {
        const reffarreby = await referralModel.find({ referral_code, status: true });
        if (!reffarreby) {
            return res.status(400).send({ error: "invalid referrel code" });
        }
        reffarreby.referralCount += 1;

        reffarreby.referraluser = [...reffarreby.referraluser, phoneNumber]
        await reffarreby.save();
        // amount of 10% should gone reffarreby account
        return res.send({ message: "Referral successful", reffarreby });
    } catch (error) {
        return res.status(500).send({ error: "internal server error" });
    }
};

module.exports = Referral;
