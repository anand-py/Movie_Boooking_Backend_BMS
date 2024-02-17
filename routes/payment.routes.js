const paymentController = require('../controllers/payment.controller')
const authJwt = require('../middlewares/authJwt')
const verifyPaymenRequestBody = require('../middlewares/verifyPaymentRequestBody')

module.exports = (app)=>{
    app.get('/mba/api/v1/payments', [authJwt.verifyToken], paymentController.getAllPayments)
    app.get('/mba/api/v1/payments',[authJwt.verifyToken], paymentController.getPaymentOnId)
    app.put('/mba/api/v1/payments', [authJwt.verifyToken, verifyPaymenRequestBody.validatePaymentReqBody], paymentController.createPayment)
}

