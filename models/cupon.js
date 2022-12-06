const mongoose = require('mongoose')

const cupon_schema = mongoose.Schema({
    
    cod_cupon: {type: String, require: true},
    porcentaje: {type: Number, require: true}
        
}, {'collection':'cupon'})

const cupon = mongoose.model('cupon', cupon_schema);
module.exports = cupon