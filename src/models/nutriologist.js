const mongoose = require('mongoose');
const {Schema} = mongoose;
//const bcrypt = require('bcrypt');
//const crypto = require('crypto-js');
const bcrypt = require('bcrypt-nodejs');

const nutriologistSchema = new Schema({
    email: {type: String, unique:true, lowercase: true},
    password: {type: String, select: false},
    name:{type:String,default:""},
    lastName:{type:String,default:""},
    signUpDate: {type:Date, default:Date.now()},
    lastLogin: Date,
    cedProfessional: {type:String,default:""},
    formation:{type:String,default:""},
    grade:{type:String,default:""},
    pacients:[{type: Schema.Types.ObjectId, ref:'Pacient'}]
});

nutriologistSchema.pre('save', function(next){
    //let user = this
    
    if(!this.isModified('password')) return next()

    bcrypt.genSalt(10, (err,salt) => {
        
        if(err) return next(err)
        
        bcrypt.hash(this.password,salt,null, (err,hash) => {
        
            if(err) return next(err)
        
            this.password = hash
            
            next()
        })
    });
});

nutriologistSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword,this.password,(err,isMatch)=>{
        cb(err,isMatch)
    })
}

module.exports = mongoose.model('Nutriologist',nutriologistSchema);