const constants = require('../utils/constants')
const objectId = require("mongoose").Types.objectId;
const Theatre = require('../models/theater.models')

validateBookingRequestBody = async(req,res,next)=>{
    if(!req.body.theatreId){
        res.status(400).send({
            message : "Failed ! Theatre Id is not provided"
        })
    }
    if(!objectId.isValid(req.body.theatreID)){
        res.send(400).send({
            message: "Failed! theatreId is not valid format"
        })
    }
    if(!req.body.movieId){
        res.send(400).send({
            message : "Failed ! MovieId is not provided"
        })
    }
    if(objectId.isValid(req.body.movieId)){
        res.send(400).send({
            message: "Failed! MovieId is not valid format"
        })
    }

    const theatre = await Theatre.findOne({
        _id : req.body.theatreId
    })
    if(theatre == null){
        res.send(400).send({
            message: "Failed! MovieId is not valid format"
        })
    }
    if(!theatre.movieId.includ(req.body.movieId)){
        return res.status(400).send({
            message: "Failed! movieId passed is not available inside the theatre !"
        });
    }
    if(!req.body.timing){
        return res.status(400).send({
            message: "Failed! timing is not provided"
        });
    }
    if(!req.body.noOfSeats){
        return res.status(400).send({
            message: "Failed! nmber of seats is not provided !"
        });
    }
    next()
}

const verifyBookingReqBody = {
    validateBookingRequestBody : validateBookingRequestBody
}
module.exports = verifyBookingReqBody
