const theatreController = require('../controllers/theatre.controller')
const verifyTheatreRequestBody = require('../middlewares/verifyTheatreRequestBody')
const authJwt = require('../middlewares/authJwt')


module.exports = (app)=>{
    app.get('/mba/api/v1/theatres', [authJwt.verifyToken], theatreController.getAllTheatre)
    app.get('/mba/api/v1/theatres/:id', [authJwt.verifyToken], theatreController.getTheatre)
    app.post('/mba/api/v1/theatres', [authJwt.verifyToken, authJwt.isAdmin, verifyTheatreRequestBody.validateTheatreReqBody] ,theatreController.createTheatre)
    app.put('/mba/api/v1/theatres/:id', [authJwt.verifyToken, authJwt.isAdmin, verifyTheatreRequestBody.validateTheatreReqBody] ,theatreController.updateTheatre)
    app.delete('/mba/api/v1/theatres/:id', [authJwt.verifyToken, authJwt.isAdmin], theatreController.deleteTheatre)
    app.put('/mba/api/v1/theatres/:id/movies', [authJwt.verifyToken, authJwt.isAdmin],theatreController.addMoviesToTheatre)
    app.get('/mba/api/v1/theatres/:theatreId/movies/:movieId',[authJwt.verifyToken], theatreController.checkMovieInsideTheatre)
}