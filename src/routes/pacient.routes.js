const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        xoauth2: xoauth2.createXOAuth2Generator({
            user: 'nutriapp.download@gmail.com',
            clientId:'137661556278-6cl3khp1g2gm8a97dht8448d7o6h54dv.apps.googleusercontent.com',
            clientSecret:'5fZdVQ4w-nFyqoaTo1I1wYvw',
            refreshToken: ''
        })
        //user:'nutriapp.download@gmail.com',
        //password:'Luismiguel123'
    }
})

const auth = require('../middlewares/auth')

const Pacient = require('../models/pacients');
const Nutriologist = require('../models/nutriologist');
const Expedient = require('../models/expedient');


//aqui puedo poner varios auth para que solo tengan acceso a ellos los que estan autorizados
//router.get('/',auth),async(req,res)=>{}

//aqui mejorar busquedas. hacer una forma para filtrar solo pacientes de cada nutriologo
router.get('/', async (req,res)=>{
    const pacients = await Pacient.find();
    res.status(200);
    res.json(pacients);
});
//ver si puedo quitar esta metodo para dejar solo 1 que filtre los pacientes
router.get('/nutriologist/:idN',async (req,res)=>{
    const pacients = await Pacient.find({nutriologist:req.params.idN});
    res.status(200);
    res.json(pacients);
})

router.post('/',async (req,res)=>{
    const {name,lastName,weight,height,birth,gender,email,idN} = req.body;
    /*const pacient = new Pacient({name,lastName,weight,height,birth});
    await pacient.save();
    res.status(200);
    res.json(pacient);*/
    
    await Nutriologist.findById(idN,(err,nutriologist)=>{
        if (err) return err;

        const pacient = new Pacient({name,lastName,weight,height,birth,gender,email,nutriologist:nutriologist._id});
        nutriologist.pacients.push(pacient._id);
        const expedient = new Expedient({pacient:pacient._id});
        pacient.expedient.push(expedient._id);
        nutriologist.save(function (err){
            if(err) return err;

            pacient.save(function (err){
                if (err) return err;

                console.log(pacient.email)
                /*const mailOption = {
                    from: 'nutriapp.download@gmail.com',
                    to:pacient.email,
                    subject:'Prueba Envio mensaje Node js',
                    text:'Esto solo es una prueba. Aqui ira el link para descargar la app'
                }
                transporter.sendMail(mailOption,function(error,info){
                    if(error) console.log(error)
                    else console.log('El mensaje se ha enviado: ' + info.response)
                })*/
                expedient.save(function (err){
                    if(err) return err;
                })


                res.status(200);
                res.json(pacient);
            })    
        })
    });
    
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