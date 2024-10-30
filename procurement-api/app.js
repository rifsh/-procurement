const express =require('express')
const cors=require('cors')
const morgan=require('morgan')
const app =express()
const bodyParser=require('body-parser')
//routeImport
const auth=require('./routes/authRoutes')
const itmes=require('./routes/itemsRoutes')
const supplier =require('./routes/supplierRoutes')
const purchase=require('./routes/purchaseRoutes')

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use('/api/auth',auth)
app.use('/api/items',itmes)
app.use('/api/supplier',supplier)
app.use('/api/purchase',purchase)

module.exports=app