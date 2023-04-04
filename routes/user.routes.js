const { Router } = require("express");
const Referral = require("../controller/referralController");
const { createPlan, getPlan, updatePlan, deletePlan, alluser } = require("../controller/adminController");
const { withdrawal, getwithdrawal, completewithdrawal, getcompletewithdrawal } = require("../controller/withdrawalController");
const inviteLink = require("../controller/invitelinkController");
const { addAccount, getAccount } = require("../controller/accountController");
const { recharge, getwallet } = require("../controller/rechargeController");
const { teamMember } = require("../controller/teamController");
const userroute = Router()
userroute.get("/allusers", alluser);
userroute.post("/referral", Referral);
userroute.post("/recharge", recharge)
userroute.get("/recharge", getwallet)
userroute.post("/addaccount", addAccount);
userroute.get("/getaccount", getAccount);
userroute.get("/plans", getPlan);
userroute.get("/invite", inviteLink);
userroute.post('/createPlan', createPlan)
userroute.post("/withdraw", withdrawal);
userroute.get("/withdraw", getwithdrawal);
userroute.get("/withdraw/complete", getcompletewithdrawal);
userroute.post("/withdraw/complete/:id", completewithdrawal);
userroute.get("/team", teamMember);



module.exports = userroute;