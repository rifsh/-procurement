const express=require('express')
const { loginadmin } = require('../controllers/authController')

const router=express.Router()

router.post('/',loginadmin)
module.exports=router