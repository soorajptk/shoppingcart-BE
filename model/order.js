const {makeDb}=require('../library/db.js')

const checkAddressAvail=async(userId)=>{
const db=makeDb();
try {
    let checkAddress=`SELECT * FROM address WHERE user_id=${userId}`
    const response=await db.query(checkAddress)
    if(response.length>0){
        return {success:true,address:true,address_id:response[0].address_id}
    }else{
        return {success:true,address:false}
    }
} catch (error) {
    return {success:false,error:"fetch checkaddress failed"}
}

}
const addAddressModel=async({userId,address,State,district,pincode,landmark,phone})=>{
const db=makeDb();
    try {
        let addAddress=`INSERT INTO address SET?`
        const response=await db.query(addAddress,{user_id:userId,address,State,district,pincode,landmark,phone})
        return {success:true,response:response.insertId}            
    } catch (error) {
        return {success:false,error:"add address failed"}            
    }
}
const addOrder=async(res,userId)=>{
    const db=makeDb()
    try {
        let orderQry=`INSERT INTO orders SET?`
       const response= await db.query(orderQry,{user_id:userId,address_id:res.addressId,total:res.total})
       let orderItemQry=`INSERT INTO order_items SET?`
       res.orderItems.forEach(async(item) => {
        const {product_id,qty}=item
        const rslt= await db.query(orderItemQry,{product_id,order_id:response.insertId,qty})
       })
       let clearCartQry=`DELETE FROM cart WHERE user_id=${userId}`
        await db.query(clearCartQry)
       return {success:true,response:"success fully items added"}
    } catch (error) {
       return {success:false,response:"add order failed"}
    }
}
module.exports={checkAddressAvail,addAddressModel,addOrder}