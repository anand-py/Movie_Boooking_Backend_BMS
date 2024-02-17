const movieController = require('../controllers/movie.controller')
const authJwt = require('../middlewares/authJwt')
const verifyMovieReqBody = require('../middlewares/verifyMovieRequestBody')




module.exports = (app)=>{
    app.get('/mba/api/v1/movies', [authJwt.verifyToken], movieController.getAllMovies);
    app.get('/mba/api/v1/movies/:id',[authJwt.verifyToken], movieController.getMovie);
    app.post('/mba/api/v1/movies/', [authJwt.verifyToken, authJwt.isAdmin ,verifyMovieReqBody.validateMovieRequestBody] , movieController.createMovie);
    app.put('/mba/api/v1/movies/:id', [authJwt.verifyToken, authJwt.isAdmin, verifyMovieReqBody.validateMovieRequestBody] , movieController.updateMovie)
    app.delete('/mba/api/v1/movies/:id',[authJwt.verifyToken, authJwt.isAdmin], movieController.deleteMovie)
}

