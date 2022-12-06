const mongoose = require('mongoose')

const estados_municipio_schema = mongoose.Schema({
    
    edo: {type: String, require: true},
    municipios:[String]
        
}, {'collection':'estados_municipio'})

const estados_municipio = mongoose.model('estados_municipio', estados_municipio_schema);
module.exports = estados_municipio