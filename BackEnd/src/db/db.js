const mongoose = require("mongoose");
require("dotenv").config();
async function connectdb(){
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to DB")
}
module.exports=connectdb