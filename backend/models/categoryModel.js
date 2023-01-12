const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    trim: true,
    required: [true, "Enter Category Name"],
  },
  categoryImage: {
    type: String,
    trim: true,
    required: [true, "Enter Category Name"],
  },
});

const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
