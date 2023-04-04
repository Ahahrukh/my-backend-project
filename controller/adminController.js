const planModel = require("../models/Plane.module");
const UserModel = require("../models/user.module");

const createPlan = async (req, res) => {
    const { planName, Price, Totalincome, Completecycle, Dailyincome } = req.body;
    try {
        const plan = await new planModel({
            planName,
            Price,
            Totalincome,
            Completecycle,
            Dailyincome,
            phoneNumber: req.phoneNumber
        });

        await plan.save();
        return res.status(201).send({ message: "plan have created" });
    } catch (error) {
        return res.status(500).send({ error: "internal server error" });
    }
};
const getPlan = async (req, res) => {
    try {
        const plan = await planModel.find();
        res.status(200).send({ planList: plan });
    } catch (error) {
        res.status(500).send({ error: "internal server error" });
    }
};

const updatePlan = async (req, res) => {
    try {
        const plan = await planModel.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        );
        const plans = await planModel.find();
        res.status(200).send({ planList: plans });
    } catch (error) {
        res.status(500).send({ error: "internal server error" });
    }
};

const deletePlan = async (req, res) => {
    try {
        const plan = await planModel.findOneAndDelete({ _id: req.params.id });
        const plans = await planModel.find();
        res.status(200).send({ planList: plans });
    } catch (error) {
        res.status(500).send({ error: "internal server error" });
    }
};

const alluser = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).send({ user });
    } catch (error) {
        res.status(500).send({ error: "internal server error" });
    }
};

module.exports = { createPlan, getPlan, updatePlan, deletePlan, alluser };
