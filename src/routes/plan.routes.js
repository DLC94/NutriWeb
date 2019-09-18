const express = require('express')
const router = express.Router();

const Plan = require('../models/plan');
const Pacient = require('../models/pacients');
const moment = require('moment');

router.get('/',async(req,res)=>{
    const plan = await Plan.find();
    res.status(200);
    res.json(plan);
});

router.get('/:id',async (req,res)=>{
    const plan = await Plan.findById(req.params.id);
    res.status(200);
    res.json(plan);
})

router.post('/',async(req,res)=>{
    const {foods,aliments,finalDate,startDate,goals,pacientid} = req.body;
    const fecha = moment().format();
    await Pacient.findById(pacientid,(err,pacient)=>{
        if(err) return res.status(500).send({message:err});
        console.log(fecha);
        const plan = new Plan({foods,aliments,finalDate,startDate,goals,pacient:pacient._id,date:fecha});
        //pacient.plan.push(plan._id);
        pacient.plan = plan._id
        pacient.save(function(err){
            if(err) return res.status(500).send({message:err});

            plan.save(function(err){
                if(err) return res.status(500).send({message:err})

                res.status(200);
                res.json(plan)
            })
        })
    })
    //console.log({foods,aliments,finalDate,startDate,goals,pacient});
    //console.log(new Date())
    //console.log(moment().format())
    //res.status(200);
    //res.json({message:"Todo bien"});
});

router.delete('/:id',async(req,res)=>{
    await Plan.findByIdAndRemove(req.params.id);
    res.status(200);
    res.json({status:"Plan Eliminado"});
});

module.exports = router