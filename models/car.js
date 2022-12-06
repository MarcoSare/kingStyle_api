const mongoose = require('mongoose')

const car_schema = mongoose.Schema({
    
    id_usuario: {type: mongoose.Types.ObjectId, ref:"usuarios"},
    producto: {type: mongoose.Types.ObjectId, ref:"producto"},
    cantidad: {type: Number, require: true},
    talla: {type: String, require: true},
            
        
}, {'collection':'car'})

const car = mongoose.model('car', car_schema);
module.exports = car