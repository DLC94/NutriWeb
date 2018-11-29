const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt-nodejs');

const pacientSchema = new Schema({
    name:{type: String, required:true},
    lastName:{type: String, required:true},
    weight:{type:Number,default:0},
    height:{type:Number,default:0},
    birth:Date,
    email:{type:String,default:"",unique:true,lowercase:true},
    gender:{type:String,default:""},
    nutriologist:{type:Schema.Types.ObjectId, ref:'Nutriologist'},
    appointmentDate:String,
    appointmentTime:String,
    expedient:[{type: Schema.Types.ObjectId, ref:'Expedient'}],
    plan:{type:Schema.Types.ObjectId,ref:'Plan'},
    password:{type:String, select:false}
});

pacientSchema.pre('save',function(next){
    if(!this.isModified('password')) return next()

    bcrypt.genSalt(10,(err,salt)=>{
        if(err) return next(err)

        bcrypt.hash(this.password,salt,null,(err,hash)=>{
            if(err) return next(err)

            this.password = hash
            next()
        })
        
    })
})

pacientSchema.methods.comparePassword = function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,(err,isMatch)=>{
        console.log(this.password,candidatePassword);
        cb(err,isMatch)
    })
}

module.exports = mongoose.model('Pacient',pacientSchema);