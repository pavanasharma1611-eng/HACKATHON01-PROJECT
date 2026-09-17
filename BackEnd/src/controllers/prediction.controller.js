const predictionModel=require("../models/prediction.model");
const uploadModel=require("../models/upload.model");
const mockPrediction=require("../mockML.js")
const predict= async(req,res) =>{
try{
   const{uploadId}=req.body;
   if(!uploadId){
    return res.status(400).json({
        success:false,
        message:"uploadId is required"
    });
   }
    const upload = await uploadModel.findById(uploadId);
    if(!upload){
        return res.status(404).json({
            success:false,
            message:"uploaded file not found"
        });
    }
    const csvData=upload.data.toString("utf-8");
    const lines=csvData.trim().split(/\r?\n/);
    const headers =lines[0].split(",");
    const row=lines.slice(1).map(line=>{
        const values = line.split(",");
        const row={};
        headers.forEach((header,index)=>{
            row[header.trim()]=values[index]?.trim();
        });
        return row;
    })
    const prediction=rows.map(row => mockPrediction(row));
    const savedprediction= await predictionModel.create({
        prediction,
    })
    res.status(200).json({
        success:true,
        message:"prediction generated!",
        prediction:savedprediction,
    });
}catch(err){
    res.status(500).json({
        success:false,
        message:"prediction failed!",
        err:err.message
    })
}
}
module.exports={predict};