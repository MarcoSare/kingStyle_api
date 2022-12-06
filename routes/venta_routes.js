const express = require('express')
const venta = require('../models/venta')
const router = express.Router();
const producto = require('../models/producto')
const jwt = require('jsonwebtoken');
const jwt_decode = require("jwt-decode")

router.post('/venta', async (req, res)=>{
    try{
        var today = new Date();
        var fecha = today.toISOString().split('T')[0]

        const token =  req.headers.authorization
        var decoded = jwt_decode(token);
        const id = decoded.userId;
        req.body.usuario = id 
        req.body.fecha = fecha
        console.log(req.body)
        let objNewVenta = req.body
        const Venta = new venta(objNewVenta)
        let savedVenta = await Venta.save()
        res.send({"message" : "Successful"})
    }
    catch(error){
        console.log(error)
    }
})

router.get('/venta', async (req, res)=>{
    try{
        const token =  req.headers.authorization
        var decoded = jwt_decode(token);
        const id = decoded.userId;
        const ven = await venta.find({usuario:id})
        res.send(ven);
    }
    catch(error){
        res.send(error);
    }
})



router.get('/ventaChart', async (req, res)=>{
    try{
        const token =  req.headers.authorization
        var decoded = jwt_decode(token);
        const id = decoded.userId;
        const ven = await venta.find({usuario:id})
        const d = [
            {Mes: "Ene", Can: 0},
            {Mes: "Feb", Can: 0},
            {Mes: "Mar", Can: 0},
            {Mes: "Abr", Can: 0},
            {Mes: "May", Can: 0},
            {Mes: "Jun", Can: 0},
            {Mes: "Jul", Can: 0},
            {Mes: "Ago", Can: 0},
            {Mes: "Sep", Can: 0},
            {Mes: "Oct", Can: 0},
            {Mes: "Nov", Can: 0},
            {Mes: "Dic", Can: 0}
        ]
        const newArray =  ven.map(async (item)=>{
            const mes = parseInt(item.fecha.split("-")[1])-1
            d[mes].Can++
            
        }
        )

        Promise.all(newArray).then(()=>{
            res.send(d)
        }
        )

       
    }
    catch(error){
        res.send(error);
    }
})

router.post('/ventaByID', async (req, res)=>{
    try{
        const token =  req.headers.authorization
        var decoded = jwt_decode(token);
        const id = decoded.userId;
        const ven = await venta.findOne({_id:req.body._id})

        const newArray =  ven.productos.map(async (item)=>{
            console.log("d")
            const productData =  await producto.findById(item.producto).select('nombre precio imagenes')
            const OneProduct =  {
                productData,
                fecha : item.fecha,
                monto : item.monto
            }
            return OneProduct
        }
        )
       Promise.all(newArray).then(data=>{
        res.send(data)
       })

        
    }
    catch(error){
        res.send(error);
    }
})




module.exports = router