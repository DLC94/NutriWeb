const express = require('express');
const router = express.Router();

const Folioid = require('../models/folioid');

router.get('/',async(req,res)=>{
    const folios = await Folioid.find();
    res.status(200);
    res.json(folios)
});

router.get('/:id',async(req,res)=>{
    const folio = await Folioid.findById(req.params.id);
    res.status(200);
    res.status(folio);
})

router.post('/',async(req,res)=>{
    const {folio,idP,name} = req.body;

    const folioex = new Folioid({folio,idP,name});
    await folioex.save();
    res.status(200);
    res.json(folioex);
});


router.delete('/:id',async(req,res)=>{
    await Folioid.findByIdAndRemove(req.params.id);
    res.status(200);
    res.json({status:"Folio Eliminado"})
})

module.exports = router;