const { sendOtpHandler } = require("./auth.services");

const router = require("express").Router();
router.post("/send-otp",sendOtpHandler)
module.exports = {
  AuthRoutes: router,
};
