const mongoose = require('mongoose');
const {Schema} = mongoose;

const folioidSchema = new Schema({
    folio:{type:String},
    idP:{type:String},
    name:{type:String}
});

module.exports = mongoose.model('Folioid',folioidSchema);