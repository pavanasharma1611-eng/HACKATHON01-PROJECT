const express=require("express");
const router= express.Router();
const predictionController=require("../controllers/prediction.controller");
router.post("/result",predictionController.predict);
module.exports=router;