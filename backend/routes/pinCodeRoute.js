const express = require("express");
const {
  addPinCode,
  deletePinCode,
  getAllPinCode,
} = require("../Controllers/pinCodeController");
const isAuthorized = require("../middleware/isAuthorized");
const isAuthUser = require("../middleware/isAuthUser");
const route = express.Router();

route.post("/add", isAuthUser, isAuthorized, addPinCode);
route.get("/getAllPinCodes", getAllPinCode);
route.delete("/delete/:pinId", isAuthUser, isAuthorized, deletePinCode);

module.exports = route;
