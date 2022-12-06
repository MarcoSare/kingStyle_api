const mongoose = require('mongoose')

const marca_schema = mongoose.Schema({
    nombre: {type: String, require: true},
    imagen: {type: String, require: true},   
},{'collection':'marcas'})

const marca = mongoose.model('marca', marca_schema);
module.exports = marca