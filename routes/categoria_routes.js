const express = require('express')
const { ObjectId } = require('mongodb');
const router = express.Router();
const categoria = require('../models/categoria')

router.get('/categoria', async (req, res)=>{
    try{
        const categorias =  await categoria.find({})
        res.json(categorias)
    }
    catch(error){
        console.log(error)
    }
})

router.post('/categoria', async (req, res)=>{
    try{
        let objNewCategoria = req.body
        const Categoria = new categoria(objNewCategoria)
        let savedCategoria = await Categoria.save()
        res.send("inserto")
    }
    catch(error){
        console.log(error)
    }
})

module.exports = router