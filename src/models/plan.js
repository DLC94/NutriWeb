const mongoose = require('mongoose');
const {Schema} = mongoose;

const planSchema = new Schema({
    foods:[],
    aliments:[],
    finalDate:Date,
    startDate:Date,
    goals:[],
    date:{type:Date},
    pacient:{type: Schema.Types.ObjectId, ref:'Pacient'}
});

module.exports = mongoose.model('Plan',planSchema);