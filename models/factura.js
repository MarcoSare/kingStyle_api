const mongoose = require('mongoose')

const facturas_schema = mongoose.Schema({
    usuario: {type: mongoose.Types.ObjectId, ref:"usuarios"},
    rfc: {type: String, require: true},
    nombre: {type: String, require: true},
    codigo_postal: {type: String, require: true},
    estado: {type: String, require: true},
    municipio: {type: String, require: true},
    colonia:  {type: String, require: true},
    calle:  {type: String, require: true},
    num_ext: {type: String, require: true},
    razon_social: {type: String, require: true},
    gastos: {type: String, require: true}
}, {'collection':'facturas'})

const facturas = mongoose.model('facturas', facturas_schema)
;
module.exports = facturas