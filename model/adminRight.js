const {makeDb}=require('../library/db.js')

const addProductModel=async({product_name,decscription,category_id,price,stock})=>{
    const db=makeDb()
try {
    let addProductQry=`INSERT INTO product SET?`
    const response=await db.query(addProductQry,{product_name,decscription,category_id,price})
    let addStock=`INSERT INTO stock SET?`
    const stockres=await db.query(addStock,{product_id:response.insertId,stock_qty:stock})
    return {success:true,msg:"successfully added"}
} catch (error) {
    return {success:false,error:'adding products failed'}
    console.log(error);
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
module.exports={addProductModel,updateStockModel}