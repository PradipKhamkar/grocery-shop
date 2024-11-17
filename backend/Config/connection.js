const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    console.log('URI',process.env.MONGODB_URI)
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("App Is Connected To Database Successfully...!!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
