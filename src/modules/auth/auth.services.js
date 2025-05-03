const { StatusCodes } = require("http-status-codes");
const { User, Otp } = require("../user/user.model");
const createHttpError = require("http-error");
const { where } = require("sequelize");
const { randomInt } = require("crypto");
require("dotenv").config();
async function sendOtpHandler(req, res, next) {
  const { phone } = req.body;
  if (!phone)
    throw createHttpError(StatusCodes.NOT_FOUND, "Invalid user phone");
  const now = Date.now();
const time = process.env.OTP_Time_Exp  
  const expiresTime=new Date(now + parseInt(time));
  console.log(expiresTime);
  
  const newOtp = {
    code: randomInt(10000, 99999),
    expires_in: expiresTime,
  };
  
  const user = await User.findOne({ where: { phone } });
  if (!user) {
    const user = await User.create({
      phone,
    });
    newOtp.userId = user?.id;
    console.log(newOtp);
    
    const otp = await Otp.create(newOtp);
    return res.json({
      message: "5 digit otp code send to you",
      code: otp.code,
    });
  } else {
    const userOtp = await Otp.findOne({ where: { userId: user.id } });
    if (!userOtp) {
      newOtp.userId = user?.id;
      const otp = await Otp.create(newOtp);
      return res.json({
        message: "5 digit otp code send to you",
        code: otp.code,
      });
    } else {
        console.log("object",now);
        console.log("object",new Date(userOtp.expires_in).getTime());
      if (new Date(userOtp.expires_in).getTime() > now) {
         throw new createHttpError.Unauthorized(
          "last otp is valid "
        );
      }
      userOtp.code = newOtp.code;
      userOtp.expires_in = newOtp.expires_in;
      await userOtp.save()
      return res.json({
        message: "5 digit otp code send to you",
        code: userOtp.code,
      });
    }
  }
}

module.exports = {
  sendOtpHandler,
};
