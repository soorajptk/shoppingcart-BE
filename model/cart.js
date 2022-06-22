const {makeDb}=require('../library/db.js')

const getAllCartItemsModel=async(userId)=>{
const db=makeDb()
let qry=`SELECT * FROM cart JOIN customer ON cart.user_id=customer.id JOIN cart_items ON cart.cart_id=cart_items.cart_id JOIN product ON product.product_id=cart_items.product_id WHERE customer.id=${userId}`
try {
    const response=await db.query(qry)
    return {success:true,response}
} catch (error) {
    return {success:false,error:"fetching cart items failed"}
}
}

const addToCartModel=async(product_id,userId)=>{
const db=makeDb()
try {
    let qry=`SELECT * FROM cart WHERE user_id=${userId}`
    const response=await db.query(qry)
    if(!response.length>0){
        let cartuser=`INSERT INTO cart SET?`
        const cartuserCreated=await db.query(cartuser,{user_id:userId})
        let cartItemqry=`INSERT INTO cart_items SET?`
        const cartItemCreated=await db.query(cartItemqry,{product_id,cart_id:cartuserCreated.insertId})
        return {success:true,response:"successfully item added to the cart"}
    }else{
        let qryCheckItem=`SELECT * FROM cart_items WHERE cart_id=${response[0].cart_id} AND product_id=${product_id} `
        const cart_itemsCheck=await db.query(qryCheckItem)
        if(cart_itemsCheck.length>0){
            let cartItemqry=`UPDATE cart_items SET? WHERE cart_id=${response[0].cart_id} AND product_id=${product_id}`
            let prevQty=`SELECT qty FROM cart_items WHERE product_id=${product_id}`
            const prev=await db.query(prevQty)
            const cartItemCreated=await db.query(cartItemqry,{qty:prev[0].qty+1})
            return {success:true,response:"successfully item added qty is incresed"}
        }else{
            let cartItemqry=`INSERT INTO cart_items SET?`
            const cartItemCreated=await db.query(cartItemqry,{product_id,cart_id:response[0].cart_id})
             return {success:true,response:"successfully item added to the cart"}
        }
    }

} catch (error) {
    return {success:true,response:"add item into the cart failed"}
}
}

const deleteCartItemModel=async(userId,id)=>{
    const db=makeDb()
    try {
        let qry=`SELECT * FROM cart WHERE user_id=${userId}`
        const response=await db.query(qry)
        let cartQty=`SELECT qty FROM cart_items WHERE cart_id=${response[0].cart_id} AND product_id=${id}`
        const [cartQtyres]=await db.query(cartQty)
        if(cartQtyres.qty>1){
         let decreaseqry=`UPDATE cart_items SET? WHERE cart_id=${response[0].cart_id} AND product_id=${id}`  
         const dec=await db.query(decreaseqry,{qty:cartQtyres.qty-1})
        return {success:true,response:"item qty decresed by one"}
        }else{
            let deleteQry=`DELETE FROM cart_items WHERE cart_id=${response[0].cart_id} AND product_id=${id}`
            const result=await db.query(deleteQry)
        return {success:true,response:"item was removed"}
        }
        } catch (error) {
            return{success:true,error:"delete cart item failed"}
        }
}
module.exports={getAllCartItemsModel,addToCartModel,deleteCartItemModel}