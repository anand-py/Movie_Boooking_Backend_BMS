const Booking = require('../models/booking.models')
const User = require('../models/user.models')
const constants = require('../utils/constants')

exports.getAllBooking = async(req,res)=>{
    try{
        const user = await User.findOne({
            userId : req.userId
        })
        const queryObj = {}
        if(user.userType == constants.userTypes.admin){
    
        }else{
            queryObj._id = user._id
        }
        const bookings = await Booking.find(queryObj)
        res.status(200).send(bookings)
    
    }catch (err) {
        res.status(500).send({
            message: "Some Internal Error Occured"
        })
    }
    }

exports.getBookingOnId = async(req,res)=>{
    try{
        const booking = await Booking.findOne({
            _id : req.params.id
        })
        res.status(200).send({booking})

    } catch (err) {
        res.status(500).send({
            message: "Some Internal Error Occured"
        })
    }
}

exports.createBooking = async(req,res)=>{
   const user = await User.findOne({
        userId : req.userId 
   })
   var bookingObject = {
        theatreId : req.body.theatreId,
        movieId : req.body.movieId,
        userId : user._id,
        timing : req.body.timing,
        noOfSeats : req.body.noOfSeats,
        totalCost: (req.body.noOfSeats * constants.ticketPrice)
   }
    try{
        const booking = await Booking.create(bookingObject)
        res.status(200).send(booking)
    }catch (err) {
        res.status(500).send({
            message: "Some Internal Error Occured",
            err : err.message
        })
    }
}

exports.updateBooking = async(req,res)=>{
    const booking = await Booking.findOne({
        _id : req.params.id
    })
    booking.theatreId = req.body.theatreId != undefined ? req.body.theatreId : booking.theatreId;
    booking.movieId = req.body.movieId != undefined ? req.body.movieId : booking.movieId;
    booking.userId = req.body.userId != undefined ? req.body.userId : booking.userId;
    booking.timing = req.body.timing != undefined ? req.body.timing : booking.timing;
    booking.noOfSeats = req.body.noOfSeats != undefined ? req.body.noOfSeats : booking.noOfSeats;
    booking.totalCost = req.body.totalCost != undefined ? req.body.totalCost : booking.totalCost;
    booking.status = req.body.status != undefined ? req.body.status : booking.status;

    try{
        const updateBooking = await Booking.save();
        res.status(200).send(updateBooking)
    }catch (err) {
        res.status(500).send({
            message: "Some Internal Error Occured"
        })
    }
}

