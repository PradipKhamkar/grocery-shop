//Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/.env" });
}
const cloudinary = require("cloudinary");
const expressFileUpload = require("express-fileupload");
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connectDB = require("./Config/connection");
const userRoutes = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const pinCodeRoute = require("./routes/pinCodeRoute");
const categoryRoute = require("./routes/categoryRoute");

//Body Parser
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

//Cookies Parser
app.use(cookieParser());

//Database Connect
connectDB();

//JSON
app.use(express.json());

//Use Express File Upload
app.use(expressFileUpload());

//Config Cloudniary
cloudinary.config({ 
  cloud_name: 'dzkexyp4x', 
  api_key: '277621367132598', 
  api_secret: 'qWZksD_8nYXzMiywrPDLSRP9gS8' 
});

app.listen(process.env.PORT, "localHost", () => {
  console.log(`Server Running At http://localhost:${process.env.PORT}`);
});

//Load Route
app.use("/api/user", userRoutes);
app.use("/api/product", productRoute);
app.use("/api/pincode", pinCodeRoute);
app.use("/api/category", categoryRoute);

//Access Front End Static Files
app.use(express.static(path.join(__dirname, "../frontend/build")));

//Access Front End All URL
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
