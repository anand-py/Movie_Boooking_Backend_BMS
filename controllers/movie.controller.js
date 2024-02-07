const Movie = require('../models/movie.models')

/**
 * Get the list of all the movies
 * Allow the filtering based on the name
 */

exports.getAllMovies = async(req,res)=>{
    const queryObj = {}
    if(req.query.name != undefined){
        queryObj.name = req.query.name
    }
    const movies = await Movie.find(queryObj)
    res.status(400).send(movies)
}

/**
 * Get the movie based on the id
 */
exports.getMovie = async(req,res)=>{
    
}

/**
 * Create the movie resource
 */
exports.createMovie = async(req,res)=>{
    
}


/**
 * Update the movie resource
 */
exports.updateMovie = async(req,res)=>{
    
}

/**
 * Delete the movie resource
 */
exports.deleteMovie = async(req,res)=>{
    
}
