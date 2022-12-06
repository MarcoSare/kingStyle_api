const mongoose = require('mongoose')

const usuarios_schema = mongoose.Schema({
    mail: {type: String, require: true},
    password: {type: String, require: true},
    isAdmin:{type:Boolean, require:true},
    name: {type: String, require: true},
    lastname: {type: String, require: true},
    phone: {type: String, require: true},
    gender:  {type: String, require: true}
}, {'collection':'usuarios'})

const usuarios = mongoose.model('usuarios', usuarios_schema);
module.exports = usuarios
