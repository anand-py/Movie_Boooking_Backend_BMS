const constants = require('../utils/constants')
const Booking = require('../models/booking.models')
var ObjectId = require('mongoose').Types.ObjectId


validatePaymentReqBody = async(req,res,next)=>{
    if(!req.body.bookingId){
        return res.status(400).send({
            message : "Failed! bookingId is not provided !"
        })
    }
    if(!ObjectId.isValid(req.body.bookingId)){
        return res.status(400).send({
            message : "Failed! bookingId is not valid format !"
        })
    }
    const booking = await Booking.findOne({
        _id : req.booking.bookingId
    })
    if(booking == null){
        return res.status(400).send({
            message :  "Failed! Booking Id passed doesn't exist !"
        })
    }
    if(req.body.amount < booking.totalCost){
        return res.status(400).send({
            message: "Can't do the payment as the payment amount is less than the booking amount"
        })
    }
    next()
}


const verifyPaymenRequestBody = {
    validatePaymentReqBody : validatePaymentReqBody
}

module.exports = verifyPaymenRequestBody