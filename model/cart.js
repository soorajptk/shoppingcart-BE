const {makeDb}=require('../library/db.js')

const getAllCartItemsModel=async(userId)=>{
const db=makeDb()
let qry=`SELECT * FROM cart JOIN customer ON cart.user_id=customer.id JOIN cart_items ON cart.cart_id=cart_items.cart_id JOIN product ON product.product_id=cart_items.product_id WHERE customer.id=${userId}`
let offerQry=`SELECT * FROM offers`
try {
    const response=await db.query(qry)
    const offerRes=await db.query(offerQry)
    return {success:true,response,offerRes}
} catch (error) {
    return {success:false,error:"fetching cart items failed"}
}
}

const addToCartModel=async(product_id,userId,qty)=>{
const db=makeDb()
try {
    let qry=`SELECT * FROM cart WHERE user_id=${userId}`
    let stockQry=`SELECT stock_qty FROM stock where product_id=${product_id}`
    let totalorderQry=`SELECT SUM(qty)as total FROM cart_items where product_id=${product_id}`
    const response=await db.query(qry)
    const total=await db.query(totalorderQry)
    const re=await db.query(stockQry)
    if(!response.length>0){
    
        let cartuser=`INSERT INTO cart SET?`
        const cartuserCreated=await db.query(cartuser,{user_id:userId})
        let cartItemqry=`INSERT INTO cart_items SET?`
        if(re[0].stock_qty>0){
            const cartItemCreated=await db.query(cartItemqry,{product_id,cart_id:cartuserCreated.insertId})
            return {success:true,response:"successfully item added to the cart"}
        }else{
            return {success:false,response:"product out of stock"}
        }
    }else{

        let prevQty=`SELECT qty FROM cart_items WHERE product_id=${product_id} AND cart_id=${response[0].cart_id}`
        const prev=await db.query(prevQty)
        let currentOrderQty=(Number(total[0].total)-Number(prev.length>0?prev[0].qty:0))+Number(qty)
        console.log(re[0].stock_qty,currentOrderQty);
    
        let qryCheckItem=`SELECT * FROM cart_items WHERE cart_id=${response[0].cart_id} AND product_id=${product_id} `
        const cart_itemsCheck=await db.query(qryCheckItem)
        if(cart_itemsCheck.length>0){
            if(re[0].stock_qty>=currentOrderQty){
                let cartItemqry=`UPDATE cart_items SET? WHERE cart_id=${response[0].cart_id} AND product_id=${product_id}`
                const cartItemCreated=await db.query(cartItemqry,{qty})
                return {success:true,response:"successfully item added qty is incresed"}
            }else{
                return {success:false,response:"product out of stock"}

            }
            
        }else{
            let cartItemqry=`INSERT INTO cart_items SET?`
            if(re[0].stock_qty>=currentOrderQty){
            const cartItemCreated=await db.query(cartItemqry,{product_id,cart_id:response[0].cart_id})
             return {success:true,response:"successfully item added to the cart"}
            }else{
             return {success:false,response:"product out of stock"}

            }
            }
    }

} catch (error) {
    console.log(error);
    return {success:false,response:"add item into the cart failed"}
}
}

const deleteCartItemModel=async(userId,id)=>{
    const db=makeDb()
    try {
        let qry=`SELECT * FROM cart WHERE user_id=${userId}`
        const response=await db.query(qry)
        let cartQty=`SELECT qty FROM cart_items WHERE cart_id=${response[0].cart_id} AND product_id=${id}`
        const [cartQtyres]=await db.query(cartQty)
            let deleteQry=`DELETE FROM cart_items WHERE cart_id=${response[0].cart_id} AND product_id=${id}`
            const result=await db.query(deleteQry)
        return {success:true,response:"item was removed"}
        } catch (error) {
            return{success:true,error:"delete cart item failed"}
        }
}
module.exports={getAllCartItemsModel,addToCartModel,deleteCartItemModel}