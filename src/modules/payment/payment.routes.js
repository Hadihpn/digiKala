const { paymentBasketHanlder, paymentVerifyHandler } = require("./payment.service");

const router = require("express").Router();
router.post("/",Authorization,paymentBasketHanlder)
router.post("/callback",paymentVerifyHandler)
module.exports = {
    PaymentRoutes
}