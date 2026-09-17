const uploadModel=require("../models/upload.model");
const jwt=require("jsonwebtoken");
const userModel=require("../models/user.model");
async function uploadFile(req,res){
    
    const token = req.cookies.token;
 if (!token){
    return res.status(401).json({
        message:"Unauthorized!"
    })
 }
try{
  const decoded= jwt.verify(token,process.env.JWT_SECRET)
  console.log(decoded)
  const user = await userModel.findOne({
     _id: decoded.id
});
  console.log(user);
  const file=req.file;
   

 if(!file){
    return res.status(400).json({
       message:"File not uploaded!"
    })
 }

 const upload= await uploadModel.create({
   user:user._id,
   filename:file.originalname,
   mimetype:file.mimetype,
   data:file.buffer
 })

  res.status(201).json({
    message:"File uploaded successfully!",
    uploadId:upload._id
 })

} catch(err){
   return res.status(401).json({
      message:"unauthorized!"
   })
}
}
module.exports={uploadFile}; 