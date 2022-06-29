const {adminAuthModel}=require('../model/adminAuth.js')
const jwt=require('jsonwebtoken')

const adminAuth=async(req,res)=>{
    const {admin_name,admin_password}=req.body
    console.log(admin_name,admin_password);
try {
   const result=await adminAuthModel(admin_name,admin_password)
    if(result.success){
        const token=jwt.sign({id:result.response[0].admin_id,name:result.response[0].name},process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFE})
      return  res.status(200).json({...result,token})
    }else{
      return  res.status(400).json(result)
    }
} catch (error) {
    return  res.status(500).json("something went wrong try again")
    
}
}

module.exports={adminAuth}