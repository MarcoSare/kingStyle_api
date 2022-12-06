const express = require('express')
const factura = require('../models/factura')
const router = express.Router();
const jwt_decode = require("jwt-decode")

//meter direcciones a la base de datos
router.post('/factura', async (req, res)=>{
    try{
        const token =  req.headers.authorization
        var decoded = jwt_decode(token);
        const id = decoded.userId;
        let dir = new factura({
            usuario: id,
            rfc:req.body.rfc,
            nombre:req.body.nombre,
            codigo_postal: req.body.codigo_postal,
            estado: req.body.estado,
            municipio: req.body.municipio, 
            colonia: req.body.colonia,
            calle: req.body.calle,
            num_ext: req.body.num_ext,
            razon_social:req.body.razon_social,
            gastos:req.body.gastos,            
        })
        dir = await dir.save();
        if(!dir)
        return res.status(400).send('{"message" : "No successful"}')
        res.send('{"message" : "Successful"}');
    }
    catch(error){
        res.send(error);
    }
})
//actualizar direccion por ObjectId de la direccion
router.put('/factura', async (req, res)=>{
    try{
        const token =  req.headers.authorization
        var decoded = jwt_decode(token);
        const id = decoded.userId;
        const dir = await direccion.updateOne({_id:req.body._id},{
            usuario: id,
            rfc:req.body.rfc,
            nombre:req.body.nombre,
            codigo_postal: req.body.codigo_postal,
            estado: req.body.estado,
            municipio: req.body.municipio, 
            colonia: req.body.colonia,
            calle: req.body.calle,
            num_ext: req.body.num_ext,
            razon_social:req.body.razon_social,
            gastos:req.body.gastos,  
        })
        console.log(req.body.calle)
        res.send('{"message" : "Successful"}');
    }
    catch(error){
        res.send(error);
    }
})
//borrar direcciones por ObjectId de la coleccion de direcciones
router.delete('/direccion', async (req, res)=>{
    try{
        const token =  req.headers.authorization
        var decoded = jwt_decode(token);
        const id = decoded.userId;
        const dir = await direccion.deleteOne({_id:req.body._id, usuario:id});
        res.send('{"message" : "Successful"}');
    }
    catch(error){
        res.send(error);
    }
})
//pbtener direcciones por id del usuario
router.get('/factura', async (req, res)=>{
    try{
        const token =  req.headers.authorization
        var decoded = jwt_decode(token);
        const id = decoded.userId;
        const dir = await factura.find({usuario:id})
        res.send(dir);
    }
    catch(error){
        res.send(error);
    }
})


router.post('/getFacturaByID', async (req, res)=>{
    try{
        const token =  req.headers.authorization
        var decoded = jwt_decode(token);
        const id = decoded.userId;
        const dir = await factura.findOne({_id: req.body._id, usuario:id})
        res.send(dir);
    }
    catch(error){
        res.send(error);
    }
})


module.exports = router