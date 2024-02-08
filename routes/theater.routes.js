const theatreController = require('../controllers/theater.controller')

module.exports = (app)=>{
    app.get('/mba/api/v1/theater', theatreController.getAllTheatre)
    app.get('/mba/api/v1/theater/:id', theatreController.getTheatre)
    app.post('/mba/api/v1/theater', theatreController.createTheatre)
    app.put('/mba/api/v1/theater/:id', theatreController.updateTheatre)
    app.delete('/mba/api/v1/theater/:id', theatreController.deleteTheatre)
}