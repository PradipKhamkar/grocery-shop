const mongoose = require("mongoose");
const validator = require("validators");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please Enter Your Name"],
    trim: true,
    minLength: [2, "Name : Minimum Two Character"],
  },

  lastName: {
    type: String,
    required: [true, "Please Enter Your Last Name"],
    trim: true,
  },

  role: {
    type: String,
    default: "User",
  },

  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    trim: true,
    minLength: [4, "Password : Minimum Four Character"],
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
