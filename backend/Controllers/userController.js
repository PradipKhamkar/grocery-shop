const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendError = require("../utils/sendError");
const { sendToken, sendCookie } = require("../utils/sendToken");

//User Register
const userRegister = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const isUserExit = await userModel.findOne({ email: email });
    if (isUserExit) {
      res.status(400).json({
        success: false,
        message: ["Oops! Email Already Exit..!!"],
      });
    } else {
      if (password == confirmPassword) {
        const NewUser = await userModel.create({
          firstName,
          lastName,
          email,
          password,
        });
        const salt = await bcrypt.genSalt(10);
        NewUser.password = await bcrypt.hash(NewUser.password, salt);
        await NewUser.save();
        res.status(201).json({
          success: true,
          message: "User Register SuccessFully..!!",
          NewUser,
        });
      } else {
        sendError(res, 400, ["Passwords Field Mismatch"]);
      }
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).map((key) => {
        errors[key] = error.errors[key].message;
      });
      sendError(res, 400, Object.values(errors));
    } else {
      sendError(res, 400, ["Somethings Went Wrong..!!"]);
    }
  }
};

//User Login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const isUserExit = await userModel.findOne({ email: email });
      if (isUserExit) {
        const isPassMatch = await bcrypt.compare(password, isUserExit.password);
        if (isUserExit.email && isPassMatch) {
          const token = await sendToken(isUserExit._id);
          await sendCookie(
            res,
            200,
            token,
            isUserExit,
            "User Login SuccessFully..!!"
          );
        } else {
          sendError(res, 400, "Invalid Email & Password");
        }
      } else {
        sendError(res, 400, "Invalid Email & Password");
      }
    } else {
      sendError(res, 400, "Invalid Email & Password");
    }
  } catch (error) {
    sendError(res, 400, error.message);
  }
};

//Change User Password
const changeUserPassword = async (req, res) => {
  try {
    const { password, confirm_password } = req.body;
    if (password && confirm_password) {
      if (password === confirm_password) {
        if (password.length >= 4) {
          const salt = await bcrypt.genSalt(10);
          const newHashPassword = await bcrypt.hash(password, salt);
          const user = await userModel.findById(req.user._id);
          user.password = newHashPassword;
          await user.save();
          res.status(201).json({
            success: true,
            message: "Password Updated..!!",
          });
        } else {
          sendError(res, 400, "Password: Minimum Four Character");
        }
      } else {
        sendError(res, 400, "Passwords Field Mismatch");
      }
    } else {
      sendError(res, 400, "All Field Required");
    }
  } catch (error) {
    console.log(error);
    sendError(res, 400, error.message);
  }
};

//Get Logged User Data
const getLoggedUser = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

//Send Password Reset Email To User
const sendUserPasswordResetEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const isUserExit = await userModel.findOne({ email: email });
      if (isUserExit) {
        const token = jwt.sign(
          { userId: isUserExit._id },
          process.env.JWT_RESET_PASSWORD_SECRET_KEY,
          {
            expiresIn: "5m",
          }
        );
        //Send Password Reset Mail
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
          },
        });
        const link = `${req.protocol}://${req.get("host")}/reset-password/${
          isUserExit._id
        }/${token}`;
        await transporter.sendMail({
          from: process.env.SMPT_MAIL,
          to: isUserExit.email,
          subject: "E-SHOP - Password Reset Link",
          html: `<h2>Hello ${isUserExit.firstName}</h2><br>
            <center>
            <h5>Your Password Reset Link is <a href=${link}>Click Here To Reset Password</a> </h5>
            </center>     `,
        });
        res.status(200).json({
          success: true,
          message: `Password Reset Link Send To ${isUserExit.email}`,
        });
      } else {
        sendError(res, 400, "User Not Exit");
      }
    } else {
      sendError(res, 400, "Email Field Is Required..!!");
    }
  } catch (error) {
    sendError(res, 400, "Please Enter Email");
  }
};

//Password Reset
const userPasswordReset = async (req, res) => {
  try {
    const { password, confirm_password } = req.body;
    const { id, token } = req.params;
    await jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET_KEY);
    if (password && confirm_password) {
      if (password === confirm_password) {
        if (password.length >= 4) {
          const user = await userModel.findById(id);
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(password, salt);
          await user.save();
          res.status(200).json({
            success: true,
            message: "Password Reset SuccessFully..!!",
          });
        } else {
          sendError(res, 400, "Password: Minimum Four Character");
        }
      } else {
        sendError(res, 400, "Both Password Field Not Match..!!");
      }
    } else {
      sendError(res, 400, "All Field Are Required..!!");
    }
  } catch (error) {
    if (error.message == "jwt expired") {
      sendError(res, 400, "Invalid Token Or Expired");
    } else {
      sendError(res, 400, "Something Went To Wrong..!!");
    }
  }
};

const loggedOutUser = (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({
    success: true,
    message: "Logged Out Successfully..!!",
  });
};

//get all orders admin
const adminGetAllUsers = async (req, res) => {
  try {
    const userDocCount = await userModel.find().countDocuments();
    const AllUsers = await userModel.find().sort({ _id: -1 });
    res.status(200).json({
      success: true,
      AllUsers,
      userDocCount,
      message: "All Orders Get SuccessFully..!!",
    });
  } catch (error) {
    console.log(error);
    sendError(res, 400, "Somethings Went's Wrong..!!");
  }
};
//Delete Product
const AdminDeleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(req.params);
    if (userId) {
      const isUserExit = await userModel.findById(userId);
      if (isUserExit) {
        const DeletedUser = await userModel.findByIdAndDelete(userId);
        res.status(200).json({
          success: true,
          message: "Product Delete SuccessFully..!!",
          DeletedUser,
        });
      } else {
        sendError(res, 400, "User Not Found");
      }
    } else {
      sendError(res, 400, "User Id Not Found");
    }
  } catch (error) {
    sendError(res, 400, "Somethings Is Wrong");
  }
};

const adminUpdateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (userId) {
      const isUserExit = await userModel.findById(userId);
      if (isUserExit) {
        isUserExit.role = req.body.UserRole;
        await isUserExit.save();
        res.status(200).json({
          success: true,
          message: "User Role Updated..!!",
          isUserExit,
        });
      } else {
        sendError(res, 400, "User Not Found..!!");
      }
    } else {
      sendError(res, 400, "User Not Found..!!");
    }
  } catch (error) {
    console.log(error.message);
    sendError(res, 400, "Somethings Went's Wrong..!!");
  }
};

module.exports = {
  userRegister,
  userLogin,
  changeUserPassword,
  getLoggedUser,
  sendUserPasswordResetEmail,
  userPasswordReset,
  loggedOutUser,
  adminGetAllUsers,
  AdminDeleteUser,
  adminUpdateUser,
};
