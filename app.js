const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { config } = require('dotenv')

// Setting environmental variables from ".env" file to process.env
config()

// Authorization section
const auth = require('./controllers/auth.controllers')
const verifyToken = require('./middelwares/authJwt').verifyToken

// Route segregation by modulxe
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')

app.use(bodyParser.json())

// Modules
app.post('/api/login', auth.login)
app.use('/api/users', verifyToken, userRoutes)
app.use('/api/products', verifyToken, productRoutes)
app.use('/api/orders', verifyToken, orderRoutes)


// Server startup
app.listen(3000, () => {
    console.log('Server started on port 3000')
})