const {randomInt} = require("crypto")
async function createOtp(params) {
  const now = new Date().getTime();
  return {
    code: randomInt(10000, 99999),
    expiresIn: now + OTP_Time_Exp,
  };
}
