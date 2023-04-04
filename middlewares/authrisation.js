const UserModel = require("../models/user.module");

const authorization = (permittedrole) => {

    return async (req, res, next) => {
        const user = await UserModel.findOne({ phoneNumber: req.phoneNumber });
        let auth = false;
        if (permittedrole.includes(user.role)) {
            auth = true
        }
        if (!auth) {
            return res.send({ message: "you are not authorize" })
        }
        next()
    }
};
module.exports = authorization