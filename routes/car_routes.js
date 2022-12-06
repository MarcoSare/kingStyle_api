const express = require('express')
const { ObjectId } = require('mongodb');
const router = express.Router();
const producto = require('../models/producto')
const car = require('../models/car')
const jwt_decode = require("jwt-decode")

router.get('/car', async (req, res)=>{
    try{
        const token =  req.headers.authorization
        var decoded = jwt_decode(token);
        const id = decoded.userId
        const cars =  await car.find({id_usuario:id})        
        let  products = []
        console.log(cars.length)
        if(cars.length>0)
        for(var i =0;cars.length>i;i++){
            const item = cars[i]
            console.log(item)
            const productData =  await producto.findById(item.producto).select('nombre precio imagenes')
            const OneProduct =  {
                productData,
                cantidad : item.cantidad,
                talla : item.talla,
                _id : item._id
            }
            //console.log(OneProduct)
            products.push(OneProduct)
            if((i+1)===cars.length)
            res.send(products)
        }
        else
        res.send(products)
    }
    catch(error){
        console.log(error)
    }
})


router.post('/localCar', async (req, res)=>{
    try{
        
        const pro = req.body.products
        console.log(pro.length)

        if(pro.length>0){
            const newArray =  pro.map(async (item)=>{
                console.log("d")
                const productData =  await producto.findById(item.producto).select('nombre precio imagenes')
                const OneProduct =  {
                    productData,
                    cantidad : item.cantidad,
                    talla : item.talla,
                }
                return OneProduct
            }
            )
           Promise.all(newArray).then(data=>{
            res.send(data)
           })
        }else{
            res.send([])
        }
    }
    catch(error){
        console.log(error)
    }
})


async function ab(pro){
    
    const newArray =  pro.map(async (item)=>{
                console.log("d")
                const productData =  await producto.findById(item.producto).select('nombre precio imagenes')
                const OneProduct =  {
                    productData,
                    cantidad : item.cantidad,
                    talla : item.talla,
                }
                //console.log(OneProduct)
                //products.push(OneProduct)
                //console.log(products)
                return OneProduct
            }
            )
           Promise.all(newArray).then(data=>{
            console.log(data)
           })
}



router.post('/car', async (req, res)=>{
    try{
        const token =  req.headers.authorization
        var decoded = jwt_decode(token);
        const id = decoded.userId
        const body = {
            id_usuario : id,
            producto : req.body.producto,
            cantidad : req.body.cantidad,
            talla : req.body.talla
        }
        console.log("gg")
        console.log(body)
        const Car = new car(body)
        let savedCategoria = await Car.save()
        res.send("inserto")
    }
    catch(error){
        console.log(error)
    }
})


router.delete('/car', async (req, res)=>{
    try{
        const token =  req.headers.authorization
        var decoded = jwt_decode(token);
        const id = decoded.userId;
        const Car= await car.deleteOne({producto:req.body.producto, id_usuario : id});
        res.send('{"message" : "Deleted"}')
    }
    catch(error){
        res.send('{"message" : "Error"}')
    }
})


router.delete('/carAll', async (req, res)=>{
    try{
        const token =  req.headers.authorization
        var decoded = jwt_decode(token);
        const id = decoded.userId;
        const Car= await car.deleteMany({id_usuario : id});
        res.send('{"message" : "Deleted"}')
    }
    catch(error){
        console.log(error)
        res.send('{"message" : "Error"}')
    }
})


router.put('/car/cantidad', async (req, res)=>{
    console.log("dsa")
    try{
        const token =  req.headers.authorization
        var decoded = jwt_decode(token);
        const id = decoded.userId;
        const cars =  await producto.findOne({_id:req.body.producto},'talla_cantidad');
        const talla_cantidad=cars.talla_cantidad;
        for (let index = 0; index < talla_cantidad.length; index++) {
            console.log(talla_cantidad[index].talla)
            if (talla_cantidad[index].talla===req.body.talla) {
                if (req.body.cantidad <= talla_cantidad[index].cantidad && req.body.cantidad>0) {
                    console.log("r")
                const up = await car.updateOne({_id:req.body._id},{$set:{
                    _id: req.body._id,
                    id_usuario : id,
                    producto : req.body.producto,
                    cantidad : req.body.cantidad,
                    talla : req.body.talla
                }})
                res.send('{"message" : "Succesful"}')  
                } else {
                    res.send('{"message_erro" : "No Stock"}')
                }
            }
        }
    }
    catch(error){
        res.send(error);
    }
})



router.post('/car/veriCantidad', async (req, res)=>{
    console.log("dsa")
    try{
        const p = await producto.findById(req.body.producto)
        const talla_cantidad=p.talla_cantidad
        let cantidad = talla_cantidad.find(item => {return item.talla == req.body.talla });  
          if(cantidad.cantidad>= req.body.cantidad)
          res.send('{"message" : "Succesful"}') 
          else
          res.send('{"message_error" : "No Stock"}')
    }
    catch(error){
        res.send(error);
    }
})


module.exports = router