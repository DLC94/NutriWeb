const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth')

const Pacient = require('../models/pacients');

//aqui puedo poner varios auth para que solo tengan acceso a ellos los que estan autorizados
//router.get('/',auth),async(req,res)=>{}
router.get('/', async (req,res)=>{
    const pacients = await Pacient.find();
    res.status(200);
    res.json(pacients);
});

router.post('/',async (req,res)=>{
    const {name,lastName,weight,height,birth} = req.body;
    const pacient = new Pacient({name,lastName,weight,height,birth});
    await pacient.save();
    res.status(200);
    res.json(pacient);
});

router.get('/:id',async (req,res) => {
    console.log(req.params.id);
    const pacient = await Pacient.findById(req.params.id);
    res.status(200);
    res.json(pacient);
});

router.put('/:id',async (req,res) => {
    const {name,lastName,weight,height,birth} = req.body;
    const newData = {name,lastName,weight,height,birth};
    await Pacient.findByIdAndUpdate(req.params.id,newData);
    res.status(200);
    res.send({status:"Paciente editado"});
});

router.delete('/:id', async (req,res) => {
    await Pacient.findByIdAndRemove(req.params.id);
    res.status(200);
    res.json({status:"Paciente Eliminado"});
});


module.exports = router;


//Otra forma en lugar de async await
/*
    Pacient.find(function(err,pacients){
        console.log(pacients)
    });
*/
/*
    Pacient.find()
        .then(data => console.log(data))
        .catch(err => console.error(err));
*/