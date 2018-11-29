const mongoose = require('mongoose');
const {Schema} = mongoose;

const foodSchema = new Schema({
    porcion:{type:String,default:''},
    alimento:{type:String,default:''},
    kcal:{type:Number,default:0},
    group:{type:String,default:''},
    equivalente:{type:String,default:''},
    image:{type:String,default:''}
});

module.exports = mongoose.model('Food',foodSchema);