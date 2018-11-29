const express = require('express');
const router = express.Router();

const Food = require('../models/food');

router.get('/', async (req,res)=>{
    const foods = await Food.find();
    res.status(200);
    res.json(foods);
});

router.get('/:id',async(req,res)=>{
    const food = await Food.findById(req.params.id);
    res.status(200);
    res.json(food);
});

router.put('/:id',async(req,res)=>{
    const {porcion,alimento,kcal,group,equivalente} = req.body;
    const newData = {porcion,alimento,kcal,group,equivalente};
    await Food.findByIdAndUpdate(req.params.id,newData);
    res.status(200);
    res.send({message:"Alimento actualizado"});
})

router.post('/',async (req,res)=>{
    const {porcion,alimento,kcal,group,equivalente,image} = req.body;

    const food = new Food({porcion,alimento,kcal,group,equivalente,image});
    await food.save();
    res.status(200);
    res.json(food);
});

router.delete('/:id',async (req,res)=>{
    await Food.findByIdAndDelete(req.params.id);
    res.status(200);
    res.json({status:"Alimento eliminado"});
});

module.exports = router;