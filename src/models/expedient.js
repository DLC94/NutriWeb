const mongoose = require('mongoose');
const {Schema} = mongoose;

const expedientSchema = new Schema({
    circBrazo:{type:Number,default:0},
    pliegueTricipitak:{type:Number,default:0},
    pliegueSubescapular:{type:Number,default:0},
    pliegueBicipital:{type:Number,default:0},
    pliegueCresta:{type:Number,default:0},
    pliegueAbdominal:{type:Number,default:0},
    pliegueMuslo:{type:Number,default:0},
    plieguePantorrila:{type:Number,default:0},
    porcentajeGrasa:{type:Number,default:0},
    masaMuscular:{type:Number,default:0},
    porcentajeAgua:{type:Number,default:0},
    grasaVisceral:{type:Number,default:0},
    glusoca:{type:Number,default:0},
    creatininaSerica:{type:Number,default:0},
    urea:{type:Number,default:0},
    trigliceridos:{type:Number,default:0},
    colesterolTotal:{type:Number,default:0},
    HDL:{type:Number,default:0},
    LDL:{type:Number,default:0},
    VLDL:{type:Number,default:0},
    acidoUrico:{type:Number,default:0},
    hemoglobinaGlucosidala:{type:Number,default:0},
    numComidas:{type:Number,default:0},
    tiempoComiendo:{type:Number,default:0},
    alimentosComidas:{type:Number,default:0},
    aguaDia:{type:Number,default:0},
    frutaDia:{type:Number,default:0},
    verduraDia:{type:Number,default:0},
    carneQuesoHuevoDia:{type:Number,default:0},
    lecheDia:{type:Number,default:0},
    leguminosasDia:{type:Number,default:0},
    tortillaDia:{type:Number,default:0},
    panDia:{type:Number,default:0},
    bolilloDia:{type:Number,default:0},
    arrozPastaAvenaTapiocaDia:{type:Number,default:0},
    refrescoDia:{type:Number,default:0},
    pacient:{type: Schema.Types.ObjectId, ref:'Pacient'}
});

module.exports = mongoose.model('Expedient',expedientSchema);