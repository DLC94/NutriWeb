const express = require('express');
const router = express.Router();
const moment = require('moment');

const Expedient = require('../models/expedient');
const Pacient = require('../models/pacients');

router.get('/', async (req,res)=>{
    const expedients = await Expedient.find();
    res.status(200);
    res.json(expedients);
});

router.get('/pacient/:idP', async(req,res)=>{
    const expedient = await Expedient.find({pacient:req.params.idP});
    res.status(200);
    res.json(expedient);
});

router.get('/:id',async(req,res)=>{
    const expedient = await Expedient.findById(req.params.id);
    res.status(200);
    res.json(expedient);
});

router.post('/', async(req,res)=>{
    const {circBrazo, pliegueTricipitak, pliegueSubescapular, pliegueBicipital, pliegueCresta, pliegueAbdominal,
        pliegueMuslo, plieguePantorrila, porcentajeGrasa, masaMuscular, porcentajeAgua, grasaVisceral, glusoca,
        creatininaSerica, urea, trigliceridos, colesterolTotal, HDL, LDL, VLDL, acidoUrico, hemoglobinaGlucosidala,
        numComidas, tiempoComiendo, alimentosComidas, aguaDia, frutaDia, verduraDia, carneQuesoHuevoDia, lecheDia,
        leguminosasDia, tortillaDia, panDia, bolilloDia, arrozPastaAvenaTapiocaDia, refrescoDia,_id} = req.body;
    const fecha = moment().format();

    await Pacient.findById(_id,(err,pacient)=>{
        if(err) return res.status(500).send({message:err})

        console.log(fecha);
        const expedient = new Expedient({circBrazo, pliegueTricipitak, pliegueSubescapular, pliegueBicipital, pliegueCresta, pliegueAbdominal,
            pliegueMuslo, plieguePantorrila, porcentajeGrasa, masaMuscular, porcentajeAgua, grasaVisceral, glusoca,
            creatininaSerica, urea, trigliceridos, colesterolTotal, HDL, LDL, VLDL, acidoUrico, hemoglobinaGlucosidala,
            numComidas, tiempoComiendo, alimentosComidas, aguaDia, frutaDia, verduraDia, carneQuesoHuevoDia, lecheDia,
            leguminosasDia, tortillaDia, panDia, bolilloDia, arrozPastaAvenaTapiocaDia, refrescoDia,pacient:pacient._id,date:fecha})
        
        pacient.expedient.push(expedient._id);
        pacient.save(function(err){
            if(err) return res.status(500).send({message:err})

            expedient.save(function(err){
                if(err) return res.status(500).send({message:err})

                res.status(200);
                res.json(expedient)
            })
        })
    })

    //res.status(200);
    //res.json({message:"Todo bien"});
});

router.put('/:id', async(req,res)=>{
    const {circBrazo, pliegueTricipitak, pliegueSubescapular, pliegueBicipital, pliegueCresta, pliegueAbdominal,
        pliegueMuslo, plieguePantorrila, porcentajeGrasa, masaMuscular, porcentajeAgua, grasaVisceral, glusoca,
        creatininaSerica, urea, trigliceridos, colesterolTotal, HDL, LDL, VLDL, acidoUrico, hemoglobinaGlucosidala,
        numComidas, tiempoComiendo, alimentosComidas, aguaDia, frutaDia, verduraDia, carneQuesoHuevoDia, lecheDia,
        leguminosasDia, tortillaDia, panDia, bolilloDia, arrozPastaAvenaTapiocaDia, refrescoDia} = req.body;
    const newData = {circBrazo, pliegueTricipitak, pliegueSubescapular, pliegueBicipital, pliegueCresta, pliegueAbdominal,
        pliegueMuslo, plieguePantorrila, porcentajeGrasa, masaMuscular, porcentajeAgua, grasaVisceral, glusoca,
        creatininaSerica, urea, trigliceridos, colesterolTotal, HDL, LDL, VLDL, acidoUrico, hemoglobinaGlucosidala,
        numComidas, tiempoComiendo, alimentosComidas, aguaDia, frutaDia, verduraDia, carneQuesoHuevoDia, lecheDia,
        leguminosasDia, tortillaDia, panDia, bolilloDia, arrozPastaAvenaTapiocaDia, refrescoDia};
    await Expedient.findByIdAndUpdate(req.params.id,newData);
    res.status(200);
    res.send({status:"Expediente editado"});
});

router.delete('/:id', async (req,res) => {
    //await Expedient.findByIdAndRemove(req.params.id);
    const id = req.params.id;
    const exp = await Expedient.findById(id);
    
    await Pacient.findById(exp.pacient,(err,pacient)=>{
        if(err) return err;

        
        const index = pacient.expedient.findIndex(e => {
            return e.toString() === id;
        })
        if(index > -1){
            pacient.expedient.splice(index,1);
        }

        console.log(pacient.expedient);

        pacient.save(function(err){
            if(err) return err;
        })
    })
    await Expedient.findByIdAndRemove(id);
    res.status(200);
    res.json({status:"Expediente eliminado"});
});

module.exports = router;