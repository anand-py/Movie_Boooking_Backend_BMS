const theatreController = require('../controllers/theatre.controller')

module.exports = (app)=>{
    app.get('/mba/api/v1/theaters', theatreController.getAllTheatre)
    app.get('/mba/api/v1/theater/:id', theatreController.getTheatre)
    app.post('/mba/api/v1/theaters', theatreController.createTheatre)
    app.put('/mba/api/v1/theater/:id', theatreController.updateTheatre)
    app.delete('/mba/api/v1/theater/:id', theatreController.deleteTheatre)
    app.put('/mba/api/v1/theater/:id/movies', theatreController.addMoviesToTheatre)
    app.get('/mba/api/v1/theaters/:theatreId/movies/:movieId',theatreController.checkMovieInsideTheatre)
}