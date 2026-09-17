const express = require("express");
const multer = require("multer");
const cookiesParser=require("cookie-parser");
const predictionModel=require("./models/prediction.model");
const authRoutes = require("./routes/auth.routes")
const uploadRoutes = require("./routes/upload.routes")
const app = express();
app.use(express.json());
app.use(cookiesParser());
const upload = multer({
    storage:multer.memoryStorage()
})
const predictionRoutes = require("./routes/prediction.routes");
app.use("/api/predict",predictionRoutes);
 
app.use("/api/auth",authRoutes)
app.use("/api/upload",uploadRoutes)

module.exports=app;