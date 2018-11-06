const mongoose = require('mongoose');
const Nutriologist = require('../models/nutriologist');
//const service = require('../services/index.js');
const services = require('../services')

function signUp(req,res){
    
    const nutriologist = new Nutriologist({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        lastName: req.body.lastName,
    });
    
    nutriologist.save((err) => {
        if(err) res.status(500).send({message:`Eror al crear el usuario: ${err}`})

       // return res.status(200).send({token: service.createToken(user)});
       return res.status(200).send({ token: services.createToken(nutriologist) });
    });
}

function signIn(req,res){
    Nutriologist.findOne({email: req.body.email}, (err,user) => {
        if(err) return res.status(500).send({message:err})

        if(!user) return res.status(404).send({message:`Usuario No existente`});

        console.log(req.body.email,req.body.password)
        return user.comparePassword(req.body.password, (err,isMatch)=>{
            if(err) return res.status(500).send({message: `Aqui esta el error Error al ingresar ${err}`})
            if(!isMatch) return res.status(404).send({message:`Contrasena incorrecta`})

            req.user = user;
            return res.status(200).send({message:'Te has logueado correctamente',token:services.createToken(user)});
        })
          
        
        /*req.user = user
        res.status(200).send({
            message:"Te has logueado correctamente",
            token: service.createToken(user)
        })*/
    })
    .select('_id email password name lastName');
}

module.exports = {
    signUp,
    signIn
}