const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
mongoose.connect(process.env.connection_string).then(()=>{
    console.log("Connection successful")

}).catch((error)=>{
    console.log(error);
}); 

module.export = mongoose;

//bien