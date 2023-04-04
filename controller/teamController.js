const referralModel = require("../models/refrel.module");

const teamMember = async (req, res) => {

    try {
        const reffarreby = await referralModel.aggregate([
            {
                $match:
                    { 'phoneNumber': req.phoneNumber }
            },
            { $unwind: "$referraluser" },
            {
                $lookup: {
                    from: 'wallets',
                    localField: 'referraluser.phoneNumber',
                    foreignField: 'phoneNumber',
                    as: 'customer',
                },
            },


        ])

        return res.send(reffarreby);
    } catch (error) {
        console.log(error)
        return res.status(500).send({ error: "internal server error" });
    }
};

module.exports = { teamMember }