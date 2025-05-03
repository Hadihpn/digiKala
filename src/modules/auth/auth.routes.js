const { sendOtpHandler, checkOtpHandler } = require("./auth.services");

const router = require("express").Router();
router.post("/send-otp",sendOtpHandler)
router.post("/check-otp",checkOtpHandler)
module.exports = {
  AuthRoutes: router,
};
