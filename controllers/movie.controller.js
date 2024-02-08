// This code snippet exports functions to handle various operations related to movies. It includes functions to get all movies, get a specific movie by ID, create a new movie, update an existing movie, and delete a movie. The getAllMovies function allows filtering based
const Movie = require("../models/movie.models");



/**
 * Get the list of all the movies
 * Allow the filtering based on the name
 */
exports.getAllMovies = async (req, res) => {
    const queryObj = {};
    if (req.query.name != undefined) {
        queryObj.name = req.query.name;
    }
    try {
        const movies = await Movie.find(queryObj);
        res.status(200).send(movies);
    } catch (err) {
        res.status(500).send({
            message: "Some Internal Error Occured"
        })
    }
}


/**
 * Get the movie based on the id
 */
exports.getMovie = async (req, res) => {
    try {
        const movie = await Movie.findOne({
            _id: req.params.id
        })
        res.status(200).send(movie)
    } catch (err) {
        res.status(500).send({
            message: "Some Internal Error Occured"
        })
    }
}

/**
 * Create the movie resource
 */
exports.createMovie = async (req, res) => {
    const movieObject = {
        name: req.body.name,
        description: req.body.description,
        casts: req.body.casts,
        director: req.body.director,
        trailerUrl: req.body.trailerUrl,
        posterUrl: req.body.posterUrl,
        language: req.body.language,
        releaseDate: req.body.releaseDate,
        releaseStatus: req.body.releaseStatus
    }
    try {
        const newMovie = await Movie.create(movieObject)
        res.status(200).send(newMovie)
    } catch (err) {
        res.status(500).send({
            message: "Some Internal Error Occured",
            error: err.message
        })
    }
}


/**
 * Update the movie resource
 */
exports.updateMovie = async (req, res) => {
    try {
        const savedMovie = await Movie.findById(req.params.id).exec();
        if (!savedMovie) {
            // If no movie is found, send a 404 response and return immediately to prevent further execution.
            return res.status(404).send({
                message: "Movie not found"
            });
        }
        // Update the movie properties if they exist in the request body; otherwise, keep the existing value.
        savedMovie.name = req.body.name !== undefined ? req.body.name : savedMovie.name;
        savedMovie.description = req.body.description !== undefined ? req.body.description : savedMovie.description;
        savedMovie.casts = req.body.casts !== undefined ? req.body.casts : savedMovie.casts;
        savedMovie.director = req.body.director !== undefined ? req.body.director : savedMovie.director;
        savedMovie.trailerUrl = req.body.trailerUrl !== undefined ? req.body.trailerUrl : savedMovie.trailerUrl;
        savedMovie.posterUrl = req.body.posterUrl !== undefined ? req.body.posterUrl : savedMovie.posterUrl;
        savedMovie.language = req.body.language !== undefined ? req.body.language : savedMovie.language;
        savedMovie.releaseDate = req.body.releaseDate !== undefined ? req.body.releaseDate : savedMovie.releaseDate;
        savedMovie.releaseStatus = req.body.releaseStatus !== undefined ? req.body.releaseStatus : savedMovie.releaseStatus; // Corrected typo from releaseSatus to releaseStatus

        const updatedMovie = await savedMovie.save();

        // Send the updated movie as the response
        res.status(200).send(updatedMovie);
    } catch (err) {
        // If an error occurs, send a 500 response
        res.status(500).send({
            message: "Some Internal Error Occurred ",
            error: err.message
        });
    }
};

/**
 * Delete the movie resource
 */
exports.deleteMovie = async (req, res) => {
    try{
        await Movie.deleteOne({
            _id : req.params.id
        })
        res.status(200).send({
            message : "Successfully deleted movie with id ["+ req.params.id+"]"
        })
    }catch (err) {
        // If an error occurs, send a 500 response
        res.status(500).send({
            message: "Some Internal Error Occurred ",
            err: err.message
        });
    }
    
}
