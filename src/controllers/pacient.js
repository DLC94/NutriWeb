const mongoose = require('mongoose');
const Pacient = require('../models/pacients')
const services = require('../services')

function signIn(req,res){
    Pacient.findOne({email:req.body.email},(err,user)=>{
        if(err) return res.status(500).send({message:err})

        if(!user) return res.status(404).send({message:`Usuario No Existente`});

        return user.comparePassword(req.body.password,(err,isMatch)=>{
            console.log(req.body.email,req.body.password)
            if(err) return res.status(500).send({message:`Error al ingresar ${err}`})
            if(!isMatch) return res.status(404).send({message:'Contrasena incorrecta'})

            req.user = user;
            return res.status(200).send({
                message:'Te has logueado correctamente',
                token:services.createToken(user),
                id:user._id
            });
        })
    })
    .select('_id email password name lastName');
}

module.exports = {signIn};