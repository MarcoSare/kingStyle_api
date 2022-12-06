const mongoose = require('mongoose')

const categoria_schema = mongoose.Schema({
    nombre: {type: String, require: true}
}, {'collection':'categorias'})

const categoria = mongoose.model('categoria', categoria_schema);
module.exports = categoria