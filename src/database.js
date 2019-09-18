const mongoose = require('mongoose');

//const URI = 'mongodb://ThiIsAPassword:TheRealPassword@cluster0-shard-00-00-euadh.mongodb.net:27017,cluster0-shard-00-01-euadh.mongodb.net:27017,cluster0-shard-00-02-euadh.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
const URI = 'mongodb://karhab94:luismiguel123@mongodb01-shard-00-00-vd1k1.mongodb.net:27017,mongodb01-shard-00-01-vd1k1.mongodb.net:27017,mongodb01-shard-00-02-vd1k1.mongodb.net:27017/test?ssl=true&replicaSet=mongodb01-shard-0&authSource=admin&retryWrites=true'
mongoose.set('useCreateIndex',true);
mongoose.connect(URI, {useNewUrlParser:true})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;
//mongodb+srv://karhab94:luismiguel123@mongodb01-vd1k1.mongodb.net/admin

/**
 * carlos.delacruz@mailprotech.com
 * jd9iQN
 */