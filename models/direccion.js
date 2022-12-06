const mongoose = require("mongoose");

const direccion_schema = mongoose.Schema(
  {
    usuario: { type: mongoose.Types.ObjectId, ref: "usuarios" },
    nombre: { type: String, require: true },
    codigo_postal: { type: String, require: true },
    estado: { type: String, require: true },
    municipio: { type: String, require: true },
    colonia: { type: String, require: true },
    calle: { type: String, require: true },
    num_ext: { type: String, require: true },
    num_int: { type: String },
    calle_1: { type: String },
    calle_2: { type: String },
    lugar: { type: String, require: true },
    tel_cont: { type: String, require: true },
    descripcion: { type: String, require: true },
  },
  { collection: "direcciones" }
);

const direccion = mongoose.model("direccion", direccion_schema);
module.exports = direccion;
