const {updateProductModel,updateStockModel,singleProductModel,addOfferModel,addProductModel}=require('../model/adminRight.js')
const path = require('path');

    const addProduct=async(req,res)=>{
        if (!req.files) {
            return res.status(400).json("please provide a image")
          }
          const productImage = req.files.image;
            if (!productImage.mimetype.startsWith('image')) {
            return res.status(400).json("please provide a image")
          }
          const maxSize = 1024 * 1024;
          if (productImage.size > maxSize) {
            return res.status(400).json("Please upload image smaller 1MB")
          }
          const imagePath = path.join(
            __dirname,
            '../public/uploads/' + `${productImage.name}`
          );
          await productImage.mv(imagePath);
        const {product_name,decscription,category_id,price,stock}=req.body
        try {
            const result=await addProductModel({product_name,decscription,category_id,price,stock,image:`/uploads/${productImage.name}`})
            if(result.success){
                return res.status(200).json(result)
            }else{
            return res.status(500).json(result)
            }
        } catch (error) {
            return res.status(500).json("something went wrong please try again later")
        }
    }

    const updateProduct=async(req,res)=>{
        const {product_name,decscription,price,stock,product_id}=req.body
        try {
            const result=await updateProductModel({product_id,product_name,decscription,price,stock})
            if(result.success){
                return res.status(200).json(result)
            }else{
            return res.status(500).json(result)
            }
        } catch (error) {
            return res.status(500).json("something went wrong please try again later")
        }
    }
    const singleProduct=async(req,res)=>{
        const {id:product_id}=req.params
        try {
            const result=await singleProductModel(product_id)
            if(result.success){
                return res.status(200).json(result)
            }else{
            return res.status(500).json(result)
            }
        } catch (error) {
            return res.status(500).json("something went wrong please try again later")
        }
    }

    
    const offerProduct=async(req,res)=>{
        const {product_id,discount,Date}=req.body
        try {
            const result=await addOfferModel(product_id,discount,Date)
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


const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    return res.status(400).json("please provide a image")
  }
  const productImage = req.files.image;
    if (!productImage.mimetype.startsWith('image')) {
    return res.status(400).json("please provide a image")
  }
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    return res.status(400).json("Please upload image smaller 1MB")
  }
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  return res
    .status(200)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

module.exports={addProduct,updateStock,updateProduct,singleProduct,offerProduct,uploadProductImageLocal}