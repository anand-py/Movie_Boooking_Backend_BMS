const { response } = require('express');
const Theatre = require('../models/theater.models')
const Movie = require('../models/movie.models');
const constants = require('../utils/constants');

exports.getAllTheatre = async(req,res)=>{
    const queryObj = {}
    if(req.query.name != undefined){
        queryObj.name = req.query.name;
    } 
    if(req.query.name != undefined){
        queryObj.name = req.query.name;
    } 
    if(req.query.name != undefined){
        queryObj.name = req.query.name;
    } 
    try{
        var theatres = await Theatre.find(queryObj)
       
    if (req.query.movieId != undefined) {
        //filter the list of the theatres
        theatres = theatres.filter(t => t.movies.includes(req.query.movieId));
    }
        res.status(200).send(theatres)
    }catch (err) {
        res.status(500).send({
            message: "Some Internal Error Occured",
            err : err.message
        })
    }
}

exports.getTheatre = async (req,res)=>{
    try{
        const theatre = await Theatre.findOne({
            _id : req.params.id
        })
        res.status(200).send(theatre)
    }catch (err) {
        res.status(500).send({
            message: "Some Internal Error Occured",
            err : err.message
        })
    }
}

exports.createTheatre = async(req,res)=>{
    try{
        const theatreObject = {
        name: req.body.name,
        city: req.body.city,
        description: req.body.description,
        pinCode: req.body.pinCode

    }
    // Check if the user is an admin before allowing the update
    if (!req.user || req.user.role !== constants.userTypes.admin ) {
        return res.status(403).send({
            message: "Unauthorized. Only admins can update theatres."
        });
    }

    const theatre = await Theatre.create(theatreObject);
    res.status(201).send(theatre);
    }catch (err) {
        res.status(500).send({
            message: "Some Internal Error Occured",
            err : err.message
        })
    }
}   

exports.updateTheatre = async(req,res)=>{
    try{
        const savedTheatre = await Theatre.findOne({_id: req.params.id}); // Corrected usage of findOne
        if(!savedTheatre){
            return res.status(404).send({ // Added return to prevent further execution
                message: "Theatre not found"
            });
        }
              // Check if the user is an admin before allowing the update
              if (!req.user || req.user.role !== constants.userTypes.admin ) {
                return res.status(403).send({
                    message: "Unauthorized. Only admins can update theatres."
                });
            }
        savedTheatre.name = req.body.name !== undefined ? req.body.name : savedTheatre.name;
        savedTheatre.city = req.body.city !== undefined ? req.body.city : savedTheatre.city;
        savedTheatre.description = req.body.description !== undefined ? req.body.description : savedTheatre.description;
        savedTheatre.pinCode = req.body.pinCode !== undefined ? req.body.pinCode : savedTheatre.pinCode;
        
        var updatedTheatre = await savedTheatre.save(); // Corrected typo
        res.status(200).send(updatedTheatre);
    }catch (err) {
        res.status(500).send({
            message: "Some Internal Error Occurred",
            err: err.message
        });
    }
};

exports.deleteTheatre = async(req,res)=>{
    try{
        await Theatre.deleteOne({
            _id : req.params.id
        })
        res.status(200).send({
            message : "Successfully deleted Theatre with id [" + req.params.id + "]"
        } )
    }catch (err) {
        res.status(500).send({
            message: "Some Internal Error Occured",
            err : err.message
        })
    }    
}

exports.addMoviesToTheatre = async(req,res)=>{
    try{
        const savedTheatre = await Theatre.findOne({_id : req.params.id})
        movieIds = req.body.movieIds
        if(req.body.insert){
            movieIds.forEach(movieId => {
                savedTheatre.movies.push(movieId)
            });
            await savedTheatre.save(); //save in the database
    res.status(200).send(savedTheatre);
        }
    }catch (err) {
        res.status(500).send({
            message: "Some Internal Error Occured",
            err : err.message
        })
    }   
}

exports.checkMovieInsideTheatre = async (req,res)=>{
    try{
        const savedTheatre = await Theatre.findOne({_id: req.params.theatreId})
        const savedMovie = await Movie.findOne({_id : req.params.movieId})
        const responseBody = {
            message :savedTheatre.movies.includes(savedMovie._id) ? "Movie is present" : "Movie is not present"
        }
        res.status(200).send(responseBody)
    }catch (err) {
        res.status(500).send({
            message: "Some Internal Error Occured",
            err : err.message
        })
    } 
}  

