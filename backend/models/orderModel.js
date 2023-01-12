const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      rate: { type: Number, required: true },
      image: { type: String, required: true },
    },
  ],

  total: {
    type: Number,
    required: true,
  },
  shippingInfo: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    mobileNumber: { type: Number, required: true, maxLength: 10 },
    pinCode: { type: Number, required: true, maxLength: 6 },
  },

  status: {
    type: String,
    default: "Processing",
  },

  orderDate: {
    type: String,
    default: () =>
      new Date().toLocaleDateString("en-us", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
  },
});

const orderModel = mongoose.model("orders", orderSchema);

module.exports = orderModel;
