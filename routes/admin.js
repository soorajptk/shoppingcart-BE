const express=require('express')
const router=express.Router()
const {adminAuth}=require('../controllers/adminAuth')
const {addProduct,updateStock}=require('../controllers/adminRight')
const auth=require('../middlewares/adminAuth')

router.route('/login').post(adminAuth)
router.route('/addproduct').post(auth,addProduct)
router.route('/updatestock').post(auth,updateStock)

module.exports=router