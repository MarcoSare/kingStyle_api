const mongoose = require('mongoose')

const producto_schema = mongoose.Schema({
    nombre: {type: String, require: true},
    descripcion: {type: String, require: true},
    categoria: {type: mongoose.Types.ObjectId, ref:"categoria"},
    marca: {type: mongoose.Types.ObjectId, ref:"marca"},
    precio:  {type: Number, require: true},
    color:  {type: String, require: true},
    sku : {type: String, require: true},
    modelo : {type: String, require: true},
    composicion : {type: String, require: true},
    talla_cantidad: [
          {
            talla: {type: String, require: true},
            cantidad: {type: Number, require: true},
            _id: false ,
          }
      ],
    imagenes:[String]
}, {'collection':'productos'})

const producto = mongoose.model('producto', producto_schema);
module.exports = producto