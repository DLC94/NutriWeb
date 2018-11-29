const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const smtpTransport = require('nodemailer-smtp-transport');

//contra judith.ortega@    JyRSYr
//contra 
const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure:true,
    auth:{
        type:'OAuth2',
        user: 'nutriapp.download@gmail.com',
        clientId:'567783844777-3ta3sg8n6uup183eq44r9kr8c6qdcf5p.apps.googleusercontent.com',
        clientSecret:'XUbhKM6CpGeIMDrlThEX_4m2',
        refreshToken: '1/cZ1dSDzO_1IpTyuuoi7JxtU0vUjJUrg_KTxOmECampW8XBpe-RlQnNSHW33FDGnV'
    }
})

const auth = require('../middlewares/auth')

const Pacient = require('../models/pacients');
const Nutriologist = require('../models/nutriologist');
const Expedient = require('../models/expedient');

const pacientCtrl = require('../controllers/pacient');

const generator = require('generate-password');


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
    await Nutriologist.findById(idN,(err,nutriologist)=>{
        if (err) {
            console.log(err);
            return err;
        }
        const password = generator.generate({length:6,numbers:true});
        
        const pacient = new Pacient({name,lastName,weight,height,birth,gender,email,nutriologist:nutriologist._id,password});
        
        
        //const fecha = new Date();
        //const expedient = new Expedient({pacient:pacient._id,date:fecha});
        nutriologist.pacients.push(pacient._id);
        
        nutriologist.save(function (err){
            if(err){ 
                console.log('error: ', err);
                return err
            }

            pacient.save(function (err){
                if (err) return res.status(500).send({message:`Error al crear el usuario: Correo Ya existente`});;

                const mailOption = {
                    from: 'NutriWeb',//'nutriapp.download@gmail.com',
                    to:pacient.email,
                    subject:'Link Descarga NutriApp',
                    text:`Hola ${pacient.name}. Esto solo es una prueba. Aqui ira el link para descargar la app. Tu contrasena para ingresar a la aplicacion es ${password}`
                }
                transporter.sendMail(mailOption,function(error,info){
                    if(error) console.log(error)
                    else console.log('El mensaje se ha enviado: ' + info.response)
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
    const {name,lastName,weight,height,birth,appointmentDate,appointmentTime} = req.body;
    const newData = {name,lastName,weight,height,birth,appointmentDate,appointmentTime};
    await Pacient.findByIdAndUpdate(req.params.id,newData);
    res.status(200);
    res.send({status:"Paciente editado"});
});

router.delete('/:id', async (req,res) => {
    await Pacient.findByIdAndRemove(req.params.id);
    res.status(200);
    res.json({status:"Paciente Eliminado"});
});

router.post('/signin',pacientCtrl.signIn)

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