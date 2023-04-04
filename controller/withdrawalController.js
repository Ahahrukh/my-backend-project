const { error } = require("npmlog");
const UserModel = require("../models/user.module");
const withdrawalModel = require("../models/withdrawal.module");
const bycrpt = require("bcrypt");
const referralModel = require("../models/refrel.module");
const withdrawal = async (req, res) => {
    const { amount, phoneNumber, withdrawalPassword } = req.body;
    try {
        const user = await UserModel.findOne({ userid: req.userId });
        const hash = user?.withdrawalPassword;


        if (hash === withdrawalPassword) {
            const results = new withdrawalModel({
                user_id: req.userId,
                amount: amount,
                status: "pending",
                admin_id: null,
                phoneNumber: phoneNumber
            });
            await results.save()
            return res.status(201).send({ message: "Withdrawal request submitted" });
        } else {
            return res.status(400).send({ message: "please write correct withrawal password" });
        }

    } catch (error) {
        console.log(error)
        res.status(500).send({ error: "internal server error" });
    }
};

const getwithdrawal = async (req, res) => {
    const withdrawals = await withdrawalModel
        .aggregate([
            {
                $match: {
                    status: "pending"
                }
            },
            {
                $lookup: {
                    from: 'accounts',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'customer',
                },
            },
        ])
    return res.status(200).send({ withdrawals });
};

const getcompletewithdrawal = async (req, res) => {
    const withdrawals = await withdrawalModel
        .aggregate([
            {
                $match: {
                    status: "completed"
                }
            },
            {
                $lookup: {
                    from: 'accounts',
                    localField: 'user_id',
                    foreignField: 'user_id',
                    as: 'customer',
                },
            },
        ])
    return res.status(200).send({ withdrawals });
};

const completewithdrawal = async (req, res) => {
    const userId = req.userId;

    const withdrawal = await withdrawalModel.findOne({ _id: req.params.id, status: 'pending' });

    if (!withdrawal) {
        res.status(400).send({ error: 'No pending withdrawal request found' });
    } else {
        const result = await withdrawalModel.updateOne(
            { _id: withdrawal._id },
            { $set: { status: 'completed', admin_id: userId } }
        );
        if (result.modifiedCount === 0) {
            res.status(400).send({ error: "Failed to complete withdrawal" });
        } else {
            res.send({ message: "Withdrawal completed successfully" });
        }
    }
}

module.exports = { withdrawal, getwithdrawal, getcompletewithdrawal, completewithdrawal };
