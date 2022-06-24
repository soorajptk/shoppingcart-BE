const {makeDb}=require('../library/db.js')

 const productModel=async()=>{
    const db =makeDb();
    let qry=`SELECT * FROM product join category on category.category_id=product.category_id`
    let offerQry=`SELECT * FROM offers`

    try {
        const response=await db.query(qry)
    const offerRes=await db.query(offerQry)
        return {success:true,response,offerRes}
    } catch (error) {
        return {success:false,error:"fetching products failed"}

    }
}


module.exports={productModel}