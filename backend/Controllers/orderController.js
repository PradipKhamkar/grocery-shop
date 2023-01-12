const productModel = require("../models/productModel");
const orderModel = require("../models/orderModel");
const sendError = require("../utils/sendError");

const newOrder = async (req, res) => {
  try {
    const { cartItems, shippingInfo, userId, total } = req.body;
    const newOrder = await orderModel.create({
      user: userId,
      shippingInfo: shippingInfo,
      total: total,
    });
    newOrder.orderItems = cartItems;
    await updateStock(cartItems);
    await newOrder.save();
    res.status(200).json({
      success: true,
      newOrder,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//update stock
const updateStock = (cartItems) => {
  cartItems.map(async (item) => {
    const product = await productModel.findById(item.id);
    product.stocks = product.stocks - item.quantity;
    await product.save();
  });
};

//Get Customer Orders
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    if (userId) {
      const orders = await orderModel.find({ user: userId }).sort({ _id: -1 });
      res.status(200).json({
        success: true,
        message: "Orders Get SuccessFully",
        myOrders: orders,
      });
    } else {
      sendError(res, 400, "Invalid User Id ");
    }
  } catch (error) {
    sendError(res, 400, "Somethings Is Wrong..!!");
  }
};

//Get Customer Order Details
const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (orderId) {
      const order = await orderModel.findById(orderId);
      res.status(200).json({
        success: true,
        order,
      });
    } else {
      sendError(res, 400, "Invalid OrderId..!!");
    }
  } catch (error) {
    console.log(error.message);
    sendError(res, 400, "Somethings Is Wrong..!!");
  }
};

//get all orders admin
const adminAllOrders = async (req, res) => {
  try {
    const OrdersCount = await orderModel.find().countDocuments();
    const AllOrders = await orderModel
      .find()
      .sort({ _id: -1 })
      .populate("user");
    res.status(200).json({
      success: true,
      AllOrders,
      OrdersCount,
      message: "All Orders Get SuccessFully..!!",
    });
  } catch (error) {
    console.log(error);
    sendError(res, 400, "Somethings Went's Wrong..!!");
  }
};

//Admin Update Order
const AdminUpdateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    if (orderId) {
      const updatedOrder = await orderModel.findById(orderId);
      updatedOrder.status = req.body.oStatus;
      await updatedOrder.save();
      res.status(200).json({
        success: true,
        message: "Order Updated..!!",
        updatedOrder,
      });
    } else {
      sendError(res, 404, "Order Id Not Found");
    }
  } catch (error) {
    console.log(error.message);
    sendError(res, 400, "Somethings Went,s To Wrong..!!");
  }
};

module.exports = {
  newOrder,
  getMyOrders,
  getOrderDetails,
  adminAllOrders,
  AdminUpdateOrder,
};
