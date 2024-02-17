const Payment = require('../models/payment.models')
const Booking = require('../models/booking.models')
const constants = require('../utils/constants')


exports.getAllPayments = async (req,res)=>{

}

exports.getPaymentOnId = async (req,res)=>{
    try{
        const paymets = await Payment.findOne({
            _id : req.params.id
        })
        res.status(200).send(paymets)
    }catch (err) {
        res.status(500).send({
            message: "Some Internal Error Occured",
            err : err.message
        })
    } 
}

exports.createPayment = async(req,res)=>{

}
