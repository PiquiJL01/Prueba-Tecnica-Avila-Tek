// Configurando las variables del ambiente del archivo .env
const { config } = require('dotenv')
config()

const express = require('express')
const app = express()
const bodyParser = require('body-parser')


// Seccion de autorizacion
const auth = require('./controllers/auth.controllers')
const verifyToken = require('./middelwares/authJwt')

// Segregacion de las rutas por modulos
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const orderRoutes = require('./routes/order')

app.use(bodyParser.json())

// Modulos
app.post('/api/login', auth.login)
app.use('/api/users', verifyToken, userRoutes)
app.use('/api/products', verifyToken, productRoutes)
app.use('/api/orders', verifyToken, orderRoutes)


// Inicializacion del Servidor
app.listen(process.env.port, () => {
    setTimeout(() => {
        console.log(`Servidor iniciado en el puerto ${process.env.port}`);
    }, 0);
});

module.exports = app