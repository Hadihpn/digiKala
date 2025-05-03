const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const createHttpError = require("http-error");
const { User } = require("../modules/user/user.model");
require("dotenv").config();
async function Authorization(req, res, next) {
  try {
    let accessToken;
    const { authorization } = req?.headers;
    if (!authorization)
      throw new createHttpError(StatusCodes.UNAUTHORIZED, "invalid token");
    const [bearer, token] = authorization?.split(" ");
    const verified = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!verified || !verified.phone)
      throw new createHttpError(StatusCodes.UNAUTHORIZED, "invalid token");
    const user = await User.findOne({ phone: verified.phone });
    if (!user)
      throw new createHttpError(StatusCodes.UNAUTHORIZED, "invalid token");
    req.user = {
      id: user.id,
      phone: user.phone,
      fullName: user.fullName,
    };
    return next();
  } catch (error) {
    next(error);
  }
}
module.exports = Authorization