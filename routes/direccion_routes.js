const express = require('express')
const direccion = require('../models/direccion')
const router = express.Router();
const jwt_decode = require("jwt-decode")

//meter direcciones a la base de datos
router.post('/direccion', async (req, res)=>{
    try{
        const token =  req.headers.authorization
        var decoded = jwt_decode(token);
        const id = decoded.userId;
        let dir = new direccion({
            usuario: id,
            nombre:req.body.nombre,
            codigo_postal: req.body.codigo_postal,
            estado: req.body.estado,
            municipio: req.body.municipio, 
            colonia: req.body.colonia,
            calle: req.body.calle,
            num_ext: req.body.num_ext,
            num_int: req.body.num_int,
            calle_1: req.body.calle_1,
            calle_2: req.body.calle_2,
            lugar: req.body.lugar,
            tel_cont: req.body.tel_cont,
            descripcion : req.body.descripcion
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
router.put('/direccion', async (req, res)=>{
    try{
        const token =  req.headers.authorization
        var decoded = jwt_decode(token);
        const id = decoded.userId;
        const dir = await direccion.updateOne({_id:req.body._id},{
            usuario:id,
            nombre:req.body.nombre,
            codigo_postal: req.body.codigo_postal,
            estado: req.body.estado,
            municipio: req.body.municipio, 
            colonia: req.body.colonia,
            calle: req.body.calle,
            num_ext: req.body.num_ext,
            num_int: req.body.num_int,
            calle_1: req.body.calle_1,
            calle_2: req.body.calle_2,
            lugar: req.body.lugar,
            tel_cont: req.body.tel_cont,
            descripcion : req.body.descripcion
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
router.get('/direccion', async (req, res)=>{
    try{
        const token =  req.headers.authorization
        var decoded = jwt_decode(token);
        const id = decoded.userId;
        const dir = await direccion.find({usuario:id})
        res.send(dir);
    }
    catch(error){
        res.send(error);
    }
})


router.post('/getDireccionByID', async (req, res)=>{
    try{
        const token =  req.headers.authorization
        var decoded = jwt_decode(token);
        const id = decoded.userId;
        const dir = await direccion.findOne({_id: req.body._id, usuario:id})
        res.send(dir);
    }
    catch(error){
        res.send(error);
    }
})


module.exports = router