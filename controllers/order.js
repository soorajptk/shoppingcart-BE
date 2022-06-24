const {checkAddressAvail,addAddressModel,addOrder}=require('../model/order.js')

const addToOrder=async(req,res)=>{
 const response=await addOrder(req.body,req.user.userId)   
 if(response.success){
    return res.status(200).json(response)
 }else{
    return res.status(401).json(response)
 }
}

const addAddress=async(req,res)=>{
    const {userId}=req.user
    const {address,State,district,pincode,landmark,phone}=req.body
    const result=await addAddressModel({userId,address,State,district,pincode,landmark,phone})
    if(result.success){
        return res.status(200).json(result)
    }else{
        return res.status(401).json(result)
    }
}


const checkAddress=async(req,res)=>{
const result=await checkAddressAvail(req.user.userId)
if(result.success){
    return res.status(200).json(result)
}else{
    return res.status(401).json(result)
}
}
module.exports={addToOrder,checkAddress,addAddress}     