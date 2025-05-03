const { sendOtpHandler, checkOtpHandler, verifyRefreshTokenHandler } = require("./auth.services");

const router = require("express").Router();
router.post("/send-otp",sendOtpHandler)
router.post("/check-otp",checkOtpHandler)
router.post("/refresh-token",verifyRefreshTokenHandler)
module.exports = {
  AuthRoutes: router,
};
