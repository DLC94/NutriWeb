const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth')

const nutriologistCtrl = require('../controllers/nutriologist');

const Nutriologist = require('../models/nutriologist');

router.get('/', async (req,res)=>{
    const nutriologists = await Nutriologist.find();
    res.status(200);
    res.json(nutriologists);
});

router.get('/:id',async (req,res) => {
    const nutriologist = await Nutriologist.findById(req.params.id);
    res.status(200);
    res.json(nutriologist);
})

router.delete('/:id', async (req,res) => {
    await Nutriologist.findByIdAndDelete(req.params.id);
    res.status(200);
    res.json({status:"Nutriologo Eliminado"});
});

router.put('/:id',async (req,res)=>{
    const {cedProfessional,email,formation,lastName,name,grade} = req.body;
    const newData = {cedProfessional,email,formation,lastName,name,grade};
    await Nutriologist.findByIdAndUpdate(req.params.id,newData);
    res.status(200);
    res.send({status:"Nutriologo Editado"});
})

router.get('/private',auth,(req,res)=>{
    res.status(200).send({ message:'Tienes Acceso' })
})

router.post('/signup',nutriologistCtrl.signUp);
router.post('/signin',nutriologistCtrl.signIn);

module.exports = router;