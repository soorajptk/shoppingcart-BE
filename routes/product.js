const express=require('express')
const router=express.Router()
const {getAllProduct,cart,addToCart,deleteCartItem}=require('../controllers/product')
const auth=require('../middlewares/authentication')

router.route('/').get(auth,getAllProduct)
router.route('/cart').get(auth,cart)
router.route('/addcart').post(auth,addToCart)
router.route('/deletecart/:id').get(auth,deleteCartItem)
module.exports=router