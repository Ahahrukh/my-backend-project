const jwt = require("jsonwebtoken")
require("dotenv").config()

const authentication = (req, res, next) => {
    if (!req.headers.authorization) {

        res.send({ 'message': "Please login again" })

    }
    const user_token = req.headers.authorization.split(" ")[1]
    jwt.verify(user_token, "secret", (err, decoded) => {
        if (err) {
            return res.send({ 'message': "please login again x" })
    
    }
        req.userId = decoded.userId;
        req.phoneNumber = decoded.phoneNumber;
        req.role = decoded.role;

    })
    next();

}
module.exports = authentication