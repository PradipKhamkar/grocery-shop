const sendError = require("../utils/sendError");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const isAuthUser = async (req, res, next) => {
  try {
    //Get Token From Cookies
    if (req.cookies.token) {
      //Verify Token
      const { userId } = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET_KEY
      );
      //Get User From Token
      req.user = await userModel.findById(userId).select("-password");
      next();
    } else {
      sendError(res, 400, "");
    }
  } catch (error) {
    sendError(res, 400, "Token Not Found..!!");
  }
};

module.exports = isAuthUser;
