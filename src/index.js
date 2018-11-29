const http = require('http');
const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');

const { mongoose } = require('./database');

// Settings
app.set('port', process.env.PORT || 3000);


// Middlewares == funciones que se ejecutan antes de llegar a las rutas
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(morgan('dev'));
app.use(express.json()); // es como el body-parser

// Routes
app.use('/api/pacients',require('./routes/pacient.routes'));
app.use('/api/nutriologist',require('./routes/nutriologist.routes'));
app.use('/api/expedient',require('./routes/expedient.routes'));
app.use('/api/food',require('./routes/food.routes'));
app.use('/api/plan',require('./routes/plan.routes'));

// Static files
//console.log(__dirname + '\public');
app.use(express.static(path.join(__dirname,'public')));

app.get('*',function(req,res){
    res.sendFile(path.resolve(__dirname,'public','index.html'));
})

// Start server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});