const mongoose = require("mongoose");

const pinCodeSchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: [true, "Please Enter City..!!"],
    trim: true,
  },
  pinCode: {
    type: Number,
    required: [true, "Please Enter Pin Code..!!"],
    trim: true,
  },
});

const pinCodeModel = mongoose.model("pinCode", pinCodeSchema);

module.exports = pinCodeModel;
