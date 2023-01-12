const productModel = require("../models/productModel");
const coludinary = require("cloudinary");
const sendError = require("../utils/sendError");
const { filterData } = require("../utils/filterQuery");

//Add Product
const addProduct = async (req, res) => {
  try {
    const { name, rate, stocks, category, kilogramOption, image } = req.body;
    if (kilogramOption.length == 1) {
      sendError(res, 400, ["Weight: Required..!!"]);
    } else {
      const kgOption = [];
      kilogramOption.map((kg) => {
        kgOption.push(kg);
      });

      const result = await coludinary.v2.uploader.upload(image, {
        folder: "products",
      });

      const newProduct = await productModel.create({
        name,
        rate,
        stocks,
        category,
        kilogramOption: kgOption,
        public_id: result.public_id,
        url: result.url,
      });

      res.status(201).json({
        success: true,
        message: "Product Add SuccessFully..!!",
        newProduct,
      });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = {};
      Object.keys(error.errors).map((key) => {
        errors[key] = error.errors[key].message;
      });
      sendError(res, 400, Object.values(errors));
    } else {
      console.log(error);
      sendError(res, 400, ["Somethings Went Wrong..!!"]);
    }
  }
};

//Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (productId) {
      const isProductExit = await productModel.findById(productId);
      if (isProductExit) {
        const DeletedProduct = await productModel
          .findByIdAndDelete(productId)
          .populate("category");
        res.status(200).json({
          success: true,
          message: "Product Delete SuccessFully..!!",
          DeletedProduct,
        });
      } else {
        sendError(res, 400, "Product Not Found");
      }
    } else {
      sendError(res, 400, "Product Id Not Found");
    }
  } catch (error) {
    sendError(res, 400, error.message);
  }
};

//Update Products
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, rate, kilogramOption, category, stocks, image } = req.body;
    if (productId) {
      const isProductExit = await productModel.findById(productId);
      if (image !== "") {
        const result = await coludinary.v2.uploader.upload(image, {
          folder: "products",
        });
        isProductExit.url = result.url;
        isProductExit.public_id = result.public_id;
        isProductExit.name = name;
        isProductExit.rate = rate;
        isProductExit.category = category;
        isProductExit.stocks = stocks;
        isProductExit.kilogramOption = kilogramOption;

        await isProductExit.save();
        res.status(200).json({
          success: true,
          message: "Product Updated..!!",
        });
      } else {
        isProductExit.name = name;
        isProductExit.rate = rate;
        isProductExit.category = category;
        isProductExit.stocks = stocks;
        isProductExit.kilogramOption = kilogramOption;
        await isProductExit.save();
        res.status(200).json({
          success: true,
          message: "Product Updated..!!",
        });
      }
    } else {
      sendError(res, 400, "Product Id Not Found");
    }
  } catch (error) {
    console.log(error);
    sendError(res, 400, error.message);
  }
};

//Retrieve All Products
const getAllProduct = async (req, res) => {
  try {
    const productsDocCount = await productModel.find().countDocuments();
    const queryStr = filterData(productModel.find(), req.query);
    const products = await queryStr.populate("category");
    res.status(200).json({
      success: true,
      message: "Product Retrieve SuccessFully..!!",
      products,
      productsDocCount,
    });
  } catch (error) {
    console.log(error);
    sendError(res, 400, error.message);
  }
};

//Retrieve First Five Products
const getRecentProducts = async (req, res) => {
  try {
    const products = await productModel.find().sort({ date: -1 }).limit(10);
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    sendError(res, 400, "Something Is Wrong..!!");
  }
};

//Retrieve Single Product
const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    if (productId) {
      const product = await productModel
        .findById(productId)
        .populate("category");

      if (product) {
        res.status(200).json({
          success: true,
          message: "Product Retrieve SuccessFully..!!",
          product,
        });
      } else {
        sendError(res, 400, "Product Not Found..!!");
      }
    } else {
      sendError(res, 400, "Product Id Not Found");
    }
  } catch (error) {
    console.log(error.message);
    sendError(res, 400, "Somethings Is Wrong..!!");
  }
};

module.exports = {
  addProduct,
  deleteProduct,
  updateProduct,
  getAllProduct,
  getRecentProducts,
  getSingleProduct,
};
