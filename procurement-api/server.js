const app = require('./app')
require('dotenv').config()
const Connect = require('./config/db')
const PORT = process.env.PORT
Connect()
app.listen(PORT, () => {
    console.log('server is running on port:', PORT)
}) 