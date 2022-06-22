const {makeDb}=require('../library/db.js')

 const productModel=async()=>{
    const db =makeDb();
    let qry=`SELECT * FROM product join category on category.category_id=product.category_id`
    try {
        const response=await db.query(qry)
        return {success:true,response}
    } catch (error) {
        return {success:false,error:"fetching products failed"}

    }
}


module.exports={productModel}