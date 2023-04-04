const express=require('express')
const rechargeModel = require('../models/recharge.module')


let buyplanRoute=express.Router()

buyplanRoute.patch('/buyplan',async(req, res)=>{
    let {number,amount} = req.body
    try {
        let current=await rechargeModel.findOne({phoneNumber:number})
        console.log(current)
        let wallet= await rechargeModel.updateOne({phoneNumber:number},{$set:{assets:current.assets-amount}})
        let recharge= await rechargeModel.updateOne({phoneNumber:number},{$set:{rechargeAmount:current.rechargeAmount+amount}})
        res.send({wallet:wallet,recharge:recharge})
    } catch (error) {
        res.send({message:"error"})
    }
})

buyplanRoute.patch('/recharge',async(req,res)=>{
      let {number,amount} = req.body
    try {
        let current=await rechargeModel.findOne({phoneNumber:number})
        
        let wallet= await rechargeModel.updateOne({phoneNumber:number},{$set:{assets:current.assets+(+amount)}})
        res.send(wallet)
    } catch (error) {
        res.send({message:"error"})
    }
})
module.exports = buyplanRoute