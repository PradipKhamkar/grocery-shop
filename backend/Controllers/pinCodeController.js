const pinCodeModel = require("../models/pinCodeModel");
const sendError = require("../utils/sendError");

const addPinCode = async (req, res) => {
  try {
    const { pinCode, cityName } = req.body;
    if (pinCode && cityName) {
      const isPinCodeExit = await pinCodeModel.find({ pinCode: pinCode });
      if (isPinCodeExit.length == 0) {
        const newPinCode = await pinCodeModel.create(req.body);
        res.status(201).json({
          success: true,
          message: "Pin Code Added SuccessFully",
          newPinCode,
        });
      } else {
        sendError(res, 400, "Pin Code Already Exit..!!");
      }
    } else {
      sendError(res, 400, "All Fields Are Required..!!");
    }
  } catch (error) {
    sendError(res, 400, error.message);
  }
};

//Get ALL Pin Code

const getAllPinCode = async (req, res) => {
  try {
    const pinCodeDocCount = await pinCodeModel.find().countDocuments();
    const allPinCodes = await pinCodeModel.find();
    res.status(200).json({
      success: true,
      pinCodeDocCount,
      message: "All Pin Codes Retrieve SuccessFully",
      allPinCodes,
    });
  } catch (error) {
    console.log(error.message);
    sendError(res, 400, error.message);
  }
};

//Delete Pin Code
const deletePinCode = async (req, res) => {
  try {
    const { pinId } = req.params;
    if (pinId) {
      const isPinCodeExit = await pinCodeModel.findById(pinId);
      if (isPinCodeExit) {
        const deletedPinCode = await pinCodeModel.findByIdAndDelete(pinId);
        res.status(200).json({
          success: true,
          message: "Pin Code Deleted SuccessFully",
          deletePinCode,
        });
      } else {
        sendError(res, 400, "Pin Code Not Exit With This Id");
      }
    } else {
      sendError(res, 400, "Id Is Required..!!");
    }
  } catch (error) {
    console.log(error.message);
    sendError(res, 400, error.message);
  }
};

module.exports = { addPinCode, deletePinCode, getAllPinCode };
