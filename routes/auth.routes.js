
const { Router } = require("express");
const { Register, Login } = require("../controller/authController");
const authroutes = Router();


authroutes.post("/register", Register);
authroutes.post("/login", Login);
module.exports = authroutes
