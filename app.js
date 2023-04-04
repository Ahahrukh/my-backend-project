const express = require("express")
const cors = require('cors')
const app = express()
const authentication = require("./middlewares/authication")
const authroutes = require("./routes/auth.routes")
const connection = require("./config/connection")
const userroute = require("./routes/user.routes")
const paymentRouter = require("./routes/payment.routes")
const adminroute = require("./routes/admin.routes")
const buyplanRoute = require("./routes/buyplan.routes")
const getUserRoute = require("./routes/getUser.route")
require("dotenv").config()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.get("/", (req, res) => {
    res.send({ 'message': "This is the Home" })
})
app.use("/auth", authroutes)
app.use(authentication)
app.use('/plan', buyplanRoute)
app.use('/dashboard', getUserRoute)
app.use("/user", userroute)
app.use('/api', paymentRouter)
app.use("/admin", adminroute)
app.listen(8000, async () => {
    try {
        await connection
        console.log("connect to mongodb")
    }
    catch (err) {
        console.log(err)
    }
    console.log("port start in 8000")
})