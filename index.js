const express = require('express')
const connection = require('./connection')
const producto_routes = require('./routes/producto_routes')
const categoria_routes = require('./routes/categoria_routes')
const marca_routes = require('./routes/marca_routes')
const usuarios_routes= require('./routes/usuarios_routes')
const car_routes= require('./routes/car_routes')
const cors = require('cors')
const cupon_routes= require('./routes/cupon_routes')
const edo_mun_routes= require('./routes/estados_municipio_routes')
const direccion_routes= require('./routes/direccion_routes')
const facturas_routes= require('./routes/facturas_routes')
const venta_routes= require('./routes/venta_routes')


//const User = require('./routes/UserRouter')
//const authJwt = require('./auth/jwt')

const app = express()
const port = 3000
app.use(express.json())
//app.use(authJwt())
app.use(cors())
app.use('/api/v1', producto_routes)
app.use('/api/v1', categoria_routes)
app.use('/api/v1', marca_routes)
app.use('/api/v1', usuarios_routes)
app.use('/api/v1', car_routes)
app.use('/api/v1', cupon_routes)
app.use('/api/v1',edo_mun_routes)
app.use('/api/v1',direccion_routes)
app.use('/api/v1',facturas_routes)
app.use('/api/v1',venta_routes)

//
//app.use('/api/v1/user', User)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, "0.0.0.0",() => console.log(`Example app listening on port ${port}!`))