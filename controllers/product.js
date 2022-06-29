const {makeDb}=require('../library/db.js')
const {productModel}=require('../model/product.js')
const {getAllCartItemsModel,addToCartModel,deleteCartItemModel}=require('../model/cart.js')
const getAllProduct=async(req,res)=>{
    try {
        const response=await productModel()
    
        if(response.success){
    
            let dateTime=new Date()
            const convertDate=(date)=>{
                let newdate=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
                return newdate
            }
            let prdct=[]
            let flag=true;
            response.response.forEach(cartItem=>{
                const {product_id,price}=cartItem
                response.offerRes.forEach(offerItem=>{
                    const {product_id:offr_product_id,discount,Date}=offerItem
                    const currentDate=convertDate(dateTime)
                    const offDate=convertDate(Date)
                    if(offr_product_id===product_id && currentDate===offDate){
                        flag=false;
                            let discountPrice=(discount/100)*price
                        prdct=[...prdct,{...cartItem,offerPrice:price-discountPrice}]
                    }
                })
                if(flag){
                    prdct=[...prdct,cartItem]
                }
                flag=true;
            })
            res.status(200).json({success:true,response:prdct})
        }else{
            res.status(400).json(response)
        }
    
    } catch (error) {
        return res.status(500).json("something went wrong try again later")
    }
   }


const cart=async(req,res)=>{
    try {
        const response=await getAllCartItemsModel(req.user.userId)
        if(response.success){
            let dateTime=new Date()
            const convertDate=(date)=>{
                let newdate=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
                return newdate
            }
            let cart=[]
            let flag=true;
            response.response.forEach(cartItem=>{
                const {product_id,price}=cartItem
                response.offerRes.forEach(offerItem=>{
                    const {product_id:offr_product_id,discount,Date}=offerItem
                    const currentDate=convertDate(dateTime)
                    const offDate=convertDate(Date)
                    if(offr_product_id===product_id && currentDate===offDate){
                        flag=false;
                            let discountPrice=(discount/100)*price
                        cart=[...cart,{...cartItem,offerPrice:price-discountPrice}]
                    }
                })
                if(flag){
                    cart=[...cart,cartItem]
                }
                flag=true;
            })
            const {total}=cart.reduce((cartTotal,cartItem)=>{
                const {price,qty}=cartItem
                let originalPrice= cartItem?.offerPrice || price
                const amount=originalPrice*qty
                cartTotal.total+=amount
                return cartTotal
            },{total:0})
            res.status(200).json({success:true,response:cart,total})
        }else{
            res.status(500).json(response)  
        }   
    } catch (error) {
        return res.status(500).json("something went wrong try again later")
        
    }
   
}



const addToCart=async(req,res)=>{
    const {product_id,qty}=req.body
    try {
        const response=await addToCartModel(product_id,req.user.userId,qty)
        if(response.success){
            res.status(200).json(response)
        }else{
            res.status(401).json(response)
        }    
    } catch (error) {
        return res.status(500).json("something went wrong try again later")
        
    }
    
}            
const deleteCartItem=async(req,res)=>{
    const {id}=req.params
    try {
        const response= await deleteCartItemModel(req.user.userId,id)
    if(response.success){
        return res.status(200).json(response)
    }else{
        return res.status(200).json(response)
    }
        
    } catch (error) {
        return res.status(500).json("something went wrong try again later")
    }
}

module.exports={
    getAllProduct,cart,addToCart,deleteCartItem
}