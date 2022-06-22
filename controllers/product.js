const {makeDb}=require('../library/db.js')
const {productModel}=require('../model/product.js')
const {getAllCartItemsModel,addToCartModel,deleteCartItemModel}=require('../model/cart.js')
const getAllProduct=async(req,res)=>{
    const response=await productModel()
    if(response.success){
        res.status(200).json(response)
    }else{
        res.status(500).json(response)
    }
}

const cart=async(req,res)=>{
   const response=await getAllCartItemsModel(req.user.userId)
    if(response.success){
        res.status(200).json(response)
    }else{
        res.status(500).json(response)
    }
}


const addToCart=async(req,res)=>{
    const {product_id}=req.body
    const response=await addToCartModel(product_id,req.user.userId)
    if(response.success){
        res.status(200).json(response)
    }else{
        res.status(401).json(response)
    }
}            
const deleteCartItem=async(req,res)=>{
    const {id}=req.params

    const response= await deleteCartItemModel(req.user.userId,id)
    if(response.success){
        return res.status(200).json(response)
    }else{
        return res.status(200).json(response)
    }
}    
module.exports={
    getAllProduct,cart,addToCart,deleteCartItem
}