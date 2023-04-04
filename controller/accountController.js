const accountModel = require("../models/account.module");
const bycrpt = require("bcrypt");
const UserModel = require("../models/user.module");

const addAccount = async (req, res) => {
    const { Name,
        phoneNumber,
        bankaccount,
        bankname,
        ifsc,
        withdrawlpassword } = req.body;
    try {

        const user = await UserModel.findOne({ phoneNumber: req.phoneNumber });
        const hash = user?.withdrawalPassword;


        if (withdrawlpassword === hash) {
            const account = await new accountModel({
                Name,
                phoneNumber,
                bankaccount,
                bankname,
                ifsc,
                withdrawlpassword,
                user_id: req.userId
            });

            await account.save();
            return res.status(201).send({ message: "account  successfully added" });
        } else {
            return res.status(400).send({ message: "please write correct withrawal password" });
        }

    } catch (error) {
        return res.status(500).send({ error: "internal server error" });
    }
};

const getAccount = async (req, res) => {

    try {

        const account = await accountModel.findOne({ user_id: req.userId });

        return res.status(201).send(account);


    } catch (error) {
        return res.status(500).send({ error: "internal server error" });
    }
};

module.exports = { addAccount, getAccount };