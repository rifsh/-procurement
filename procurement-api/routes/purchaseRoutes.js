const express=require('express')
const { createPurchase, getPurchase, updatePurchase, deletePurchase } = require('../controllers/purchaseController')
const authenticate = require('../middleware/authenticate')
const router =express.Router()

router.post('/',authenticate,createPurchase)
.get('/',getPurchase)
.put('/:id',authenticate,updatePurchase)
.delete('/:id',authenticate,deletePurchase)

module.exports=router