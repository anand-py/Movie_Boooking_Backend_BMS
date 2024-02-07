const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    casts :{
        type : [String],
        required : true
    },
    trailerUrl :{
        type : [String],
        required : true
    },
    language :{
        type : [String],
        required : true,
        default : 'Hindi'
    },
    releaseDate :{
        type : String,
        required : true
    },
    releaseStatus :{
        type : String,
        required : true,
        default : 'RELEASED'
    },
    director :{
        type : String,
        required : true
    },
    updatedAt :{
        type : Date,
        default :()=>{
            return Date.now()
        }
    }
})

module.exports = mongoose.model("Movie", movieSchema)