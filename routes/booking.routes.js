const bookingController = require('../controllers/booking.controller')
const authJwt = require('../middlewares/authJwt')
const jwt = require('../middlewares/authJwt')
const verifyBookingReqBody = require('../middlewares/verifyBookingRequestBody')

module.expports = (app)=>{
    app.get('mba/api/v1/bookings', [authJwt.verifyToken], bookingController.getAllBooking)
    app.get('mba/api/v1/bookings/:id', [authJwt.verifyToken], bookingController.getBookingOnId)
    app.post('mba/api/v1/bookings', [authJwt.verifyToken, verifyBookingReqBody.validateBookingRequestBody], bookingController.createBooking)
    app.put('mba/api/v1/bookings/:id',[authJwt.verifyToken],     bookingController.updateBooking)
}


