const {addProductModel,updateStockModel}=require('../model/adminRight.js')

    const addProduct=async(req,res)=>{
        const {product_name,decscription,category_id,price,stock}=req.body
        try {
            console.log(product_name,decscription,category_id,price);
            const result=await addProductModel({product_name,decscription,category_id,price,stock})
            if(result.success){
                return res.status(200).json(result)
            }else{
            return res.status(500).json(result)
            }
        } catch (error) {
            return res.status(500).json("something went wrong please try again later")
        }
    }

    const updateStock=async(req,res)=>{
        const {product_id,qty}=req.body
        try {
            const result=await updateStockModel(product_id,qty)    
            if(result.success){
                return res.status(200).json(result)
            }else{
                return res.status(400).json(result)

            }       
        } catch (error) {
            return res.status(500).json("something went wrong try again")
            
        }
    }

module.exports={addProduct,updateStock}