const predictionModel=require("../models/prediction.model");
const uploadModel=require("../models/upload.model");
const mockPrediction=require("../mockML.js")
const predict= async(req,res) =>{
try{
   const{uploadId}=req.body;
   if(1uploadId){
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
    const rows=lines.slice(1).map(line=>{
        const values = line.split(",");
        const rows={};
        headers.forEach((header,index)=>{
            row[header.trim()]=values[index]?.trim();
        });
        return row;
    })
    const prediction=rows.map(row => mockPrediction(row));
    const savedprediction= await predictionModel.create({
        prediction,
        input:inputData
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
        error:error.message
    })
}
}
module.exports={predict};