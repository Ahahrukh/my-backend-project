const express=require('express')
const UserModel = require('../models/user.module')

let getUserRoute=express.Router()

getUserRoute.get('/getuser/:id',async(req, res)=>{
    let {id} = req.params
    try {
        let current=await UserModel.findOne({_id:id})
       res.send({message:'success',user:current.wallet})
    } catch (error) {
        console.log(error)
    }
})

module.exports = getUserRoute