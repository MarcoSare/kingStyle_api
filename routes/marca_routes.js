const express = require('express')
const { ObjectId } = require('mongodb');
const router = express.Router();
const marca = require('../models/marca')

router.get('/marca', async (req, res)=>{
    try{
        const marcas =  await marca.find({})
        res.send(marcas)
    }
    catch(error){
        console.log(error)
    }
})

router.post('/marca', async (req, res)=>{
    try{
        let objNewMarca = req.body
        const Marca = new marca(objNewMarca)
        let savedMarca = await Marca.save()
        res.send("inserto")
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router