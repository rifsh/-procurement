const express=require('express')
const { createSupplier, getSupplier, updateSupllier, deleteSupplier } = require('../controllers/supplierController')
const authenticate = require('../middleware/authenticate')
const router=express.Router()

router.post('/',authenticate,createSupplier)
.get('/',getSupplier)
.put('/:id',authenticate,updateSupllier)
.delete('/:id',authenticate,deleteSupplier)

module.exports=router