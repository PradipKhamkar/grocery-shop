const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name: Required..!!"],
    trim: true,
  },
  rate: {
    type: Number,
    required: [true, "Price: Required..!!"],
    trim: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },

  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: [true, "Enter Category Name"],
  },

  stocks: {
    type: Number,
    required: [true, "Stock: Required..!!"],
    trim: true,
  },
  kilogramOption: [
    {
      type: mongoose.Schema.Types.Decimal128,
      required: [true, "KG: Required..!!"],
      trim: true,
      default: 0.5,
    },
  ],
  numOfReviews: {
    type: Number,
    trim: true,
    default: 0,
  },
  date: {
    type: Date,
    default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
  },
});

const productModel = mongoose.model("products", productSchema);

module.exports = productModel;
