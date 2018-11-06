const jwt = require('jwt-simple');
const moment = require('moment');
const SECRET_TOKEN = 'miclavedetokens';

function createToken(user){
    const payload = {
        sub: user._id, //este habra que cambiarlo
        iat: moment().unix(),
        exp: moment().add(14,'days').unix(),
    }

    return jwt.encode(payload, SECRET_TOKEN)
}

function decodeToken(token){
    const decoded = new Promise( (resolve,reject) => {
        try{
            const payload = jwt.decode(token,SECRET_TOKEN)

            if(payload.exp < moment().unix()){
                reject({
                    status:401,
                    message:'El token ha expirado'
                })
            }

            resolve(payload.sub);

        }catch(err){
            reject({
                status: 500,
                message: 'Invalid token'
            })
        }
    })

    return decoded
}

module.exports = {createToken,decodeToken}

/**
 * ESTO VA EN UN ARCHIVO APARTE LLAMADO CONFING.JS
 * Y PARA LLAMAR A SECRET_TOKEN USAMOS config.SECRET_TOKEN en lugar de solo SECRET_TOKEN
 *  module.exports = {
 *      port: process.env.PORT || 3000,
 *      db: process.env.MONGODB || 'mongodb://'
 *      SECRET_TOKEN: 'miclavedetokens'
 * }
 */