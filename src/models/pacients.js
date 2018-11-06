const mongoose = require('mongoose');
const {Schema} = mongoose;

const pacientSchema = new Schema({
    name:{type: String, required:true},
    lastName:{type: String, required:true},
    weight:{type:Number,default:0},
    height:{type:Number,default:0},
    birth:Date,
    email:{type:String,default:""},
    gender:{type:String,default:""},
    nutriologist:{type:Schema.Types.ObjectId, ref:'Nutriologist'},
    appointmentDate:Date,
    appointmentTime:Date,
    expedient:[{type: Schema.Types.ObjectId, ref:'Expedient'}],
    plan:{type:Schema.Types.ObjectId,ref:'Plan'}
});

module.exports = mongoose.model('Pacient',pacientSchema);