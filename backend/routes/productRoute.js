const express = require("express");
const {
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProduct,
  getSingleProduct,
  getRecentProducts,
} = require("../Controllers/productController");
const isAuthorized = require("../middleware/isAuthorized");
const isAuthUser = require("../middleware/isAuthUser");
const route = express.Router();

route.post("/add", isAuthUser, isAuthorized, addProduct);
route.get("/getAllProducts", getAllProduct);
route.get("/recent/products", getRecentProducts);
route.get("/getSingleProduct/:productId", getSingleProduct);
route.put("/update/:productId", isAuthUser, isAuthorized, updateProduct);
route.delete("/delete/:productId", isAuthUser, isAuthorized, deleteProduct);

module.exports = route;
