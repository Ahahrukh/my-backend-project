
const { Router } = require("express");
const { createPlan, updatePlan, deletePlan } = require("../controller/adminController");
const authorization = require("../middlewares/authrisation");

const adminroute = Router()


adminroute.post("/createPlan", authorization(["admin"]), createPlan);
adminroute.patch("/update/:id", authorization(["admin"]), updatePlan);
adminroute.delete("/delete/:id", authorization(["admin"]), deletePlan)

module.exports = adminroute