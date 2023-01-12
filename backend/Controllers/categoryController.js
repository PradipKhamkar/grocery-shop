const categoryModel = require("../models/categoryModel");
const coludinary = require("cloudinary");
const sendError = require("../utils/sendError");

//Add Category
const addCategory = async (req, res) => {
  try {
    const { categoryName, categoryImage } = req.body;

    const isCategoryExist = await categoryModel.findOne({
      categoryName: categoryName,
    });
    if (isCategoryExist) {
      sendError(res, 400, "Category Already Exist..!!");
    } else {
      const result = await coludinary.v2.uploader.upload(categoryImage, {
        folder: "category",
      });
      const newCategory = await categoryModel.create({
        categoryName,
        categoryImage: result.url,
      });
      res.status(201).json({
        success: true,
        message: "Category Added..!!",
        newCategory,
      });
    }
  } catch (error) {
    sendError(res, 400, error.message);
  }
};

//get all categories
const getAllCategories = async (req, res) => {
  try {
    const CategoriesCount = await categoryModel.find().countDocuments();
    const Categories = await categoryModel.find();
    if (Categories.length == 0) {
      sendError(res, 400, "Categories Not Found..!!");
    } else {
      res.status(200).json({
        success: true,
        Categories,
        CategoriesCount,
        message: "Add Categories Get Successfully..!!",
      });
    }
  } catch (error) {
    sendError(res, 400, "Something Went To Wrong..!!");
  }
};

//delete category
const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    if (categoryId) {
      const isCategoryExist = await categoryModel.findById(categoryId);
      if (isCategoryExist) {
        const DeletedCategory = await categoryModel.findByIdAndDelete(
          categoryId
        );
        res.status(200).json({
          success: true,
          message: "Category Delete SuccessFully..!!",
          DeletedCategory,
        });
      } else {
        sendError(res, 400, "Category Not Found");
      }
    } else {
      sendError(res, 400, "Category Id Not Found");
    }
  } catch (error) {
    sendError(res, 400, "Something Went's Wrong..!!");
  }
};

//Update Category
const updateCategory = async (req, res) => {
  try {
    if (req.params.categoryId) {
      const category = await categoryModel.findById(req.params.categoryId);
      if (req.body.categoryImage !== "") {
        const { categoryImage } = req.body;

        const result = await coludinary.v2.uploader.upload(categoryImage, {
          folder: "category",
        });
        category.categoryImage = result.url;
        category.categoryName = req.body.categoryName;
        await category.save();
        res.status(200).json({
          success: true,
          message: "Category Updated..!!",
        });
      } else {
        category.categoryName = req.body.categoryName;
        await category.save();
        res.status(200).json({
          success: true,
          message: "Category Updated..!!",
        });
      }
    } else {
      sendError("Category Id Required..!!");
    }
  } catch (error) {
    console.log(error);
    sendError(res, 400, "Somethings Went's To Wrong..!!");
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
};
