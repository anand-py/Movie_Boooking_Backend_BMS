const Payment = require('../models/payment.models')
const Booking = require('../models/booking.models')
const constants = require('../utils/constants')


exports.getAllPayments = async (req,res)=>{
    try{
        const queryObj = {};
        if(user.userType === constants.userTypes.admin){

        }else{
            const booking = await Booking.findOne({
                _id : req.userId
            })
            const bookingIds = booking.map(b=>b._id);
            queryObj._id = { $in : bookingIds}
        }
        const payments = await Payment.find()
        res.status(200).send(payments)
    }catch (err) {
        res.status(500).send({
            message: "Some Internal Error Occured",
            err : err.message
        })
    } 
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
    const booking = await Booking.findOne({
        _id : req.body.bookingId
    })

    var paymentObj = {
        bookingId : req.body.bookingId,
        amount : req.body.amount,
        status : constants.paymentStatus.success
    }
    var bookingTime = booking.createdAt;
    var currentTime = Date.now();

    var minutes = Math.floor(((currentTime - bookingTime) / 1000) / 60);
    if(minutes > 5) {
        booking.status = constants.bookingStatus.expired;
        await booking.save();
        return res.status(200).send({
            message: "Can't do the payment as the booking is delayed and expired"
        })
    }
    try{
        const payment = await Payment.create(paymentObj)
        booking.status = constants.bookingStatus.completed
        await booking.save();
        return res.status(200).send(payment)
    }catch (err) {
        res.status(500).send({
            message: "Some Internal Error Occured",
            err : err.message
        })
    } 
}
