const reviewsModel = require("../models/reviewsModel");
const sendError = require("../utils/sendError");

const addReviews = async (req, res) => {
  try {
    const { comment, ratings } = req.body;
    const isReviewsExist = await reviewsModel.findOne({ user: req.user._id });
    if (isReviewsExist) {
      isReviewsExist.comment = comment;
      isReviewsExist.ratings = ratings;
      isReviewsExist.save();
      res.status(200).json({
        success: true,
        message: "Review Update..!!",
      });
    } else {
      const newReviews = await reviewsModel.create({
        user: req.user._id,
        comment,
        ratings,
      });
      res.status(201).json({
        success: true,
        message: "Review Added..!!",
      });
    }
  } catch (error) {
    console.log(error.message);
    sendError(res, 400, "Somethings Went To Wrong..!!");
  }
};

//get All Reviews fro client
const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewsModel
      .find({ ratings: { $gte: 3 } })
      .sort({ _id: -1 })
      .populate("user");
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    sendError(res, 400, "Somethings Went To Wrong..!!");
  }
};

//get all reviews fro admin
const AdminGetAllReviews = async (req, res) => {
  try {
    const reviews = await reviewsModel
      .find()
      .sort({ _id: -1 })
      .populate("user");
    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    sendError(res, 400, "Somethings Went To Wrong..!!");
  }
};

//Delete Product
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    if (reviewId) {
      const review = await reviewsModel.findById(reviewId);
      if (review) {
        const deletedReview = await reviewsModel.findByIdAndDelete(reviewId);
        res.status(200).json({
          success: true,
          message: "Review Delete SuccessFully..!!",
        });
      } else {
        sendError(res, 400, "Review Not Found");
      }
    } else {
      sendError(res, 400, "Review Id Not Found");
    }
  } catch (error) {
    console.log(error.message);
    sendError(res, 400, "Somethings Went's Wrong..!!");
  }
};

module.exports = {
  addReviews,
  getAllReviews,
  getAllReviews,
  deleteReview,
  AdminGetAllReviews,
};
