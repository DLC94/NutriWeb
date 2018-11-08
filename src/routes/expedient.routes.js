const express = require('express');
const router = express.Router();

const Expedient = require('../models/expedient');

router.get('/', async (req,res)=>{
    const expedients = await Expedient.find();
    res.status(200);
    res.json(expedients);
});

router.get('/pacient/:idP', async(req,res)=>{
    const expedient = await Expedient.findOne({pacient:req.params.idP});
    res.status(200);
    res.json(expedient);
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
    await Expedient.findByIdAndRemove(req.params.id);
    res.status(200);
    res.json({status:"Expediente eliminado"});
});

module.exports = router;