const express = require('express')
const { ObjectId } = require('mongodb');
const router = express.Router();
const usuario = require('../models/usuarios')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwt_decode = require("jwt-decode")

router.post('/register', async (req, res)=>{
    try{
        let user = new usuario({
            mail : req.body.mail,
            password: bcrypt.hashSync(req.body.password, 10),
            isAdmin : req.body.isAdmin,
            name: req.body.name, 
            lastname: req.body.lastname,
            phone: req.body.phone,
            gender: req.body.gender,
        })
        user = await user.save();
        if(!user)
        return res.status(400).send('{"message" : "No Successful"}')
        res.send('{"message" : "Successful"}');
    }
    catch(error){
        console.log(error)
    }
})

//User not found
router.post('/login', async (req,res) => {
    try{

    
    const user = await usuario.findOne({mail: req.body.mail})
    const secret = process.env.SECRET;
    if(!user) {
        return res.status(400).send('{"message_error" : "User not found" }');
    }
    if(user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
            {
                userId: user.id,
            },
            secret,
            {expiresIn : '1d'}
        )
        res.status(200).send({user: user.mail , token: token}) 
    } else {
       res.status(400).send('{"message_error" : "Password is wrong"}');
    }}catch(error) {
        
        return res.send(error.message);
    }
})


router.get('/getUser', async (req,res) => {
    try{
    const token =  req.headers.authorization
    var decoded = jwt_decode(token);
    const user = await usuario.findOne({_id: decoded.userId})
    if(!user) {
        return res.status(400).send('{"message_error" : "User not found" }');
    } else {
        res.send(user)
    }
    }
    catch(error){
        return res.send(error.message);
    }
    
})




module.exports = router