const { User, Otp } = require("../user/user.model");
const { StatusCodes } = require("http-status-codes");
const createHttpError = require("http-error");
const { where } = require("sequelize");
const { randomInt } = require("crypto");
const { signToken } = require("../../utils/function");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { RefreshToken } = require("../user/refreshToken.model");
async function sendOtpHandler(req, res, next) {
  const { phone } = req.body;
  if (!phone)
    throw createHttpError(StatusCodes.NOT_FOUND, "Invalid user phone");
  const now = Date.now();
  const time = process.env.OTP_Time_Exp;
  const expiresTime = new Date(now + parseInt(time));
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
      console.log("object", now);
      console.log("object", new Date(userOtp.expires_in).getTime());
      if (new Date(userOtp.expires_in).getTime() > now) {
        throw new createHttpError.Unauthorized("last otp is valid ");
      }
      userOtp.code = newOtp.code;
      userOtp.expires_in = newOtp.expires_in;
      await userOtp.save();
      return res.json({
        message: "5 digit otp code send to you",
        code: userOtp.code,
      });
    }
  }
}
async function checkOtpHandler(req, res, next) {
  const { phone, code } = req.body;
  if (!phone)
    throw createHttpError(StatusCodes.BAD_REQUEST, "Invalid user phone");
  const now = Date.now();
  const time = process.env.OTP_Time_Exp;
  // const expiresTime = new Date(now + parseInt(time));

  const user = await User.findOne({
    where: { phone },
    include: [{ model: { Otp, as: "otp" } }],
  });
  if (!user) {
    throw createHttpError(StatusCodes.BAD_REQUEST, "Invalid user phone");
  }
  if (user?.otp && user?.otp?.expires_in < new Date())
    throw createHttpError(
      StatusCodes.BAD_REQUEST,
      "the otp has been expired .try to get new one"
    );
  if (user.otp.code !== code || user.otp.isUsed)
    throw createHttpError(StatusCodes.BAD_REQUEST, "your otp code is invalid");
  const { accessToken, refreshToken } = await signToken({ phone }, "1d", "7d");
  user["access_token"] = accessToken;
  user["refresh_token"] = refreshToken;
  await user.save();
  return res.json({
    message: "youre logged in successfully",
    accessToken,
    refreshToken,
  });
}
async function verifyRefreshTokenHandler(req, res, next) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      throw createHttpError(StatusCodes.BAD_REQUEST, "Invalid refreshToken");
    const existToken = await RefreshToken.findOne({where:{token:refreshToken}})
    if(existToken)  throw createHttpError(StatusCodes.BAD_REQUEST, " token expird");
    
    const verified = await jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET_KEY
    );
    if (!verified?.phone)
      throw createHttpError(StatusCodes.BAD_REQUEST, "Invalid refreshToken");
    const user = await User.findOne({ phone: verified.phone });
    if (!user)
      throw createHttpError(StatusCodes.BAD_REQUEST, "Invalid refresh token");
    const tokens = await signToken({ phone }, "1d", "7d");

    await RefreshToken.create({
      token:refreshToken,
      userId:user.id
    })
    return res.json({
      message: "youre logged in successfully",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    next(error);
  }
}
module.exports = {
  sendOtpHandler,
  checkOtpHandler,
  verifyRefreshTokenHandler,
};
