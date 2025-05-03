const {randomInt} = require("crypto")
require("dotenv").config()
const jwt = require("jsonwebtoken")
async function createOtp(params) {
  const now = new Date().getTime();
  return {
    code: randomInt(10000, 99999),
    expiresIn: now + OTP_Time_Exp,
  };
}
async function signToken(payload, jwtExpiresIn = process.env.JWT_Time_Exp,refreshExpiresIn = process.env.refresh_Time_Exp) {
  const {JWT_SECRET_KEY,REFRESH_SECRET_KEY} = process.env
  const accessToken = await jwt.sign(payload, JWT_SECRET_KEY, { jwtExpiresIn });
  const refreshToken = await jwt.sign(payload, REFRESH_SECRET_KEY, { refreshExpiresIn });
  return {accessToken,refreshToken}
}
module.exports = {
  createOtp,
  signToken
}