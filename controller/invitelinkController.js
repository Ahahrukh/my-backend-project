const referralModel = require("../models/refrel.module");


const inviteLink = async (req, res) => {
    try {
        const user = await referralModel.findOne({ phoneNumber: req.phoneNumber });
        const generatedRefLink = `${req.protocol}://${req.headers.host}/auth/register?referral_code=${user?.referral_code}`
        res.status(200).send({ generatedRefLink: generatedRefLink, referral_code: user?.referral_code });
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: "internal server error" });
    }
};
module.exports = inviteLink;