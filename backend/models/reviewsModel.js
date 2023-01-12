const mongoose = require("mongoose");

const reviewsSchema = new mongoose.Schema({
  user: {
    required: true,
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  comment: {
    type: String,
    required: true,
  },
  ratings: {
    type: Number,
    required: true,
  },
});

const reviewsModel = mongoose.model("reviews", reviewsSchema);

module.exports = reviewsModel;
