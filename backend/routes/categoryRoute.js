const express = require("express");
const {
  addCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} = require("../Controllers/categoryController");
const route = express.Router();

route.get("/get", getAllCategories);
route.post("/add", addCategory);

route.delete("/delete/:categoryId", deleteCategory);
route.put("/update/:categoryId", updateCategory);

module.exports = route;
