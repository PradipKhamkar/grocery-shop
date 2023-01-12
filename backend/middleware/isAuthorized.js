const sendError = require("../utils/sendError");

const isAuthorized = async (req, res, next) => {
  if (req.user.role === "Admin") {
    next();
  } else {
    sendError(res, 400, "Not Authorized User");
  }
};

module.exports = isAuthorized;
