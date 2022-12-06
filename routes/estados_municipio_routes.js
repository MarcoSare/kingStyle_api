const express = require('express')
const router = express.Router();
const edo_mun = require('../models/estados_municipio')


router.get('/edo_mun', async (req, res)=>{
    try{
        const data =  await edo_mun.find({})
        const re = data.map(
             (item)=>{
        const mun = item.municipios.map((i) =>{
            
            const m = {
                value : i,
                label : i
            }
            return m

        })    
            const object = {
                value : item.edo,
                label : item.edo,
                mun : mun
            }
            return object
        })

        Promise.all(re).then(d=>{
            res.send(d)
           })
    }
    catch(error){
        console.log(error)
    }
})



module.exports = router