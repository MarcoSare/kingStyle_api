const express = require("express");
const router = express.Router();
const cupon = require("../models/cupon");

router.post("/cupon", async (req, res) => {
  try {
    const cuponcin = await cupon.findOne({cod_cupon: req.body.cod_cupon});
    let message = ""
    if(cuponcin!==null)
    message = '{"message" : "Successful", "porcentaje" : "'+cuponcin.porcentaje+'"}'
    else 
    message='{"message" : "No Successful"}'
    res.send(message)
    
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
