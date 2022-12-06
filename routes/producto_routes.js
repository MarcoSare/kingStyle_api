const express = require('express')
const { ObjectId } = require('mongodb');
const router = express.Router();
const producto = require('../models/producto')
const categoria = require('../models/categoria')
const marca = require('../models/marca')
const car = require('../models/car')
const jwt_decode = require("jwt-decode")

router.get('/producto', async (req, res)=>{
    try{
        const products =  await producto.find({})
        res.send(products)
    }
    catch(error){
        console.log(error)
    }
})


router.get('/producto/:sku', async (req, res)=>{
    try{
        const product =  await producto.findOne({sku:req.params.sku})
        const models = await producto.find({modelo:product.modelo}).select('sku color')
        const avaiColors = {
            colors : models
        }
        const marcasFinal = {...product.toObject(), ...avaiColors};
            res.send(marcasFinal)
    }
    catch(error){
        console.log(error)
    }
})


router.get('/productoUser/:sku', async (req, res)=>{
    try{
        const token =  req.headers.authorization
        var decoded = jwt_decode(token);
        const id = decoded.userId
        var product =  await producto.findOne({sku:req.params.sku})
        const cars = await car.find({id_usuario:id})
        const models = await producto.find({modelo:product.modelo}).select('sku color')
        const re = await getInCar(product,cars,models)
        res.send(re)
       

       
    }
    catch(error){
        console.log(error)
    }
})


async function getInCar  (product, cars,models) {
    console.log(models)
    const avaiColors = {
        colors : models
    }
    console.log(cars.length)
    if(cars.length>0){
        for (let index = 0; index < cars.length; index++) {
            if(cars[index].producto.toString()===product._id.toString()){
                console.log(true)
                const isInCar={
                    isInCar: true
                }
                const marcasFinal = {...product.toObject(), ...isInCar, ...avaiColors};
                return marcasFinal
            }            
        if((index+1)===cars.length){
            console.log("xD")
            const isInCar={
                isInCar: false
            }
            const marcasFinal = {...product.toObject(), ...isInCar,  ...avaiColors};
            return marcasFinal
        }
    }
    }else{
        console.log("fsdf")
        const isInCar={
            isInCar: false
        }
        const marcasFinal = {...product.toObject(), ...isInCar,  ...avaiColors};
        return marcasFinal
    }
}




router.get('/producto_categoria/:nombre', async (req, res)=>{
    try{
        const categorias = await categoria.findOne({nombre:req.params.nombre})
        if(categorias !== null){
            //console.log(categorias._id)
            const productos = await producto.find({
                categoria:new ObjectId(categorias._id)
            })
            res.send(productos);
        }else{
            res.send([]);
        }
    }
    catch(error){
        console.log(error)
    }
})

router.get('/motor/:dato', async (req, res)=>{
    /* 
    Prioridad de busqueda
        Categoria
            nombre
        Marca
            nombre
        Producto [Index]
            nombre,sku,color,modelo,categoria,composicion,descripcion   
    */
    try{
        dato = req.params.dato;
        const categorias = await categoria.findOne({nombre:dato})
        const marcas = await marca.findOne({nombre:dato})
        if(categorias !== null){
            const productos = await producto.find({
                categoria:new ObjectId(categorias._id)
            })
            console.log("Categorias -> "+categorias.nombre+" -> "+productos.length);
            res.send(productos);
        }else if (marcas !== null){
            const productos = await producto.find({
                marca:new ObjectId(marcas._id)
            })
            console.log("Marcas -> "+marcas.nombre+" -> "+productos.length);
            res.send(productos);
        }else{
            const productos = await producto.find({$text:{$search:dato}}) // Index
            if (productos.length > 0){
                console.log("Productos -> "+dato+" -> "+productos.length);
                res.send(productos);
            }else{
                console.log("SIN COINCIDENCIAS");
                res.send([]);
            }
        }
    }
    catch(error){
        console.log(error)
    }
})

router.post('/producto', async (req, res)=>{
    try{
        let objNewProduct = req.body
        const Producto = new producto(objNewProduct)
        let savedProduct = await Producto.save()
        res.send("inserto")
    }
    catch(error){
        console.log(error)
    }
})

/*
router.get('/products_by_supplier/:id', async (req, res)=>{
    try{
        const products_by_supplier =
        await supplierProduct
        .find({supplier:new ObjectId(req.params.id)})
        .populate('supplier', 'name -_id')
        .populate('product', 'name -_id').select('-_id')
        res.send(products_by_supplier);
    }
    catch(error){
        console.log(error)
    }
})*/

module.exports = router