const express=require('express')
const router=express.Router()
const {addToOrder,checkAddress,addAddress} =require('../controllers/order.js')
const auth=require('../middlewares/authentication')

router.route('/').post(auth,addToOrder)
router.route('/check').get(auth,checkAddress)
router.route('/addaddress').post(auth,addAddress)

module.exports=router