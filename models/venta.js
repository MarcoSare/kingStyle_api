const mongoose = require("mongoose");

const venta_schema = mongoose.Schema(
  {
    usuario: { type: mongoose.Types.ObjectId, ref: "usuarios" },
    monto: { type: Number, require: true },
    productos: [
      {
        producto: { type: mongoose.Types.ObjectId, ref: "producto" },
      },
    ],
    direccion: {
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
    factura: {
      rfc: { type: String },
      nombre: { type: String },
      codigo_postal: { type: String },
      estado: { type: String },
      municipio: { type: String },
      colonia: { type: String },
      calle: { type: String },
      num_ext: { type: String },
      razon_social: { type: String },
      gastos: { type: String },
    },
    fecha: { type: String, require: true },
    hora: { type: String, require: true },
  },
  { collection: "ventas" }
);

const venta = mongoose.model("venta", venta_schema);
module.exports = venta;
