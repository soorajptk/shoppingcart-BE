const {makeDb}=require('../library/db.js')

const addProductModel=async({product_name,decscription,category_id,price,stock,image})=>{
    const db=makeDb()
try {
    console.log(product_name,decscription,category_id,price,stock,image);
    let addProductQry=`INSERT INTO product SET?`
    const response=await db.query(addProductQry,{product_name,decscription,category_id,price,image})
    let addStock=`INSERT INTO stock SET?`
    const stockres=await db.query(addStock,{product_id:response.insertId,stock_qty:stock})
    return {success:true,msg:"successfully added"}
} catch (error) {
    return {success:false,error:'adding products failed'}
}
}
const singleProductModel=async(id)=>{
    const db=makeDb()
try {
    const ab=`SELECT * FROM product JOIN category ON category.category_id=product.category_id JOIN stock ON stock.product_id=product.product_id WHERE product.product_id=${id}`
    const response=await db.query(ab)
    return {success:true,response}
} catch (error) {
    console.log(error);
    return {success:true,error:'single product fetch failed'}
}
}


const updateProductModel=async({product_id,product_name,decscription,price,stock})=>{
    const db=makeDb()
try {
    let updateProductQry=`UPDATE product SET? WHERE product_id=${product_id}`
    const response=await db.query(updateProductQry,{product_name,decscription,price})
    let updateStock=`UPDATE stock SET? WHERE product_id=${product_id}`
    const stockres=await db.query(updateStock,{stock_qty:stock})
    return {success:true,msg:"successfully updated"}
} catch (error) {
    console.log(error);
    return {success:false,error:'update products failed'}
}
}
const updateStockModel=async(product_id,qty)=>{
    const db=makeDb()
    try {
        let stockAddQry=`UPDATE stock SET? WHERE product_id=${product_id} `
        const response=await db.query(stockAddQry,{stock_qty:qty})
        return {success:true,msg:"updated successfully"}
    } catch (error) {
        return {success:false,msg:"updation of stock failed"}
    }
}
const addOfferModel=async(product_id,discount,Date)=>{
    const db=makeDb()
    try {
        let offerAddQry=`INSERT INTO  offers SET?`
        const response=await db.query(offerAddQry,{product_id,discount,Date})
        return {success:true,msg:"inserted successfully"}
    } catch (error) {
        console.log(error);
        return {success:false,msg:"insertion of offer failed"}
    }
}
module.exports={addProductModel,updateStockModel,updateProductModel,singleProductModel,addOfferModel}