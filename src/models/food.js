const mongoose = require('mongoose');
const {Schema} = mongoose;

const foodSchema = new Schema({
    porcion:{type:String,default:''},
    alimento:{type:String,default:''},
    kcal:{type:Number,default:0},
    group:{type:String,default:''},
    equivalente:{type:String,default:''},
    image:{type:String,default:'https://images.unsplash.com/photo-1504185945330-7a3ca1380535?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9f2d35c4ea30a81e428e66c653748f91&auto=format&fit=crop&w=321&q=80'}
});

module.exports = mongoose.model('Food',foodSchema);