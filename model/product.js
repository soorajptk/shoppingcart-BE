const {makeDb}=require('../library/db.js')

 const productModel=async()=>{
    const db =makeDb();
    let qry=`SELECT * FROM product join category on category.category_id=product.category_id join stock on stock.product_id=product.product_id`
    let offerQry=`SELECT * FROM offers`
    let response=[]
    try {
        const result=await db.query(qry)
        const products=result.map(async(item)=>{ 
        let totalorderQry=`SELECT SUM(qty)as total FROM cart_items where product_id=${item.product_id}`
        const total=await db.query(totalorderQry)
        return {...item,stock:item.stock_qty-total[0].total}   
        })
        for(let i in products){
            response.push(await products[i])
        }
        const offerRes=await db.query(offerQry)
        return {success:true,response,offerRes}
    } catch (error) {
        console.log(error);
        return {success:false,error:"fetching products failed"}

    }
}


module.exports={productModel}