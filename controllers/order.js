const {checkAddressAvail,addAddressModel,addOrder}=require('../model/order.js')

const addToOrder=async(req,res)=>{
    try {
        const response=await addOrder(req.body,req.user.userId)   
        if(response.success){
           return res.status(200).json(response)
        }else{
           return res.status(400).json(response)
        }
              
    } catch (error) {
        return res.status(500).json("something went wrong try again later")
    }
 }

const addAddress=async(req,res)=>{
    const {userId}=req.user
    const {address,State,district,pincode,landmark,phone}=req.body
    try {
        const result=await addAddressModel({userId,address,State,district,pincode,landmark,phone})
        if(result.success){
            return res.status(200).json(result)
        }else{
            return res.status(400).json(result)
        }
        } catch (error) {
        return res.status(500).json("something went wrong try again later")
    }
}


const checkAddress=async(req,res)=>{
try {
    const result=await checkAddressAvail(req.user.userId)
    if(result.success){
        return res.status(200).json(result)
    }else{
        return res.status(400).json(result)
    }
} catch (error) {
    return res.status(500).json("something went wrong try again later")
}
}
module.exports={addToOrder,checkAddress,addAddress}     