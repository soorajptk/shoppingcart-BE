const express=require('express')
const router=express.Router()
const {adminAuth}=require('../controllers/adminAuth')
const {addProduct,updateStock,updateProduct,singleProduct, offerProduct,uploadProductImageLocal}=require('../controllers/adminRight')
const auth=require('../middlewares/adminAuth')

router.route('/singleproduct/:id').get(auth,singleProduct)
router.route('/login').post(adminAuth)
router.route('/addproduct').post(auth,addProduct)
router.route('/updatestock').post(auth,updateStock)
router.route('/updateproduct').post(auth,updateProduct)
router.route('/offerproduct').post(auth,offerProduct)
router.route('/uploadimage').post(auth,uploadProductImageLocal)

module.exports=router