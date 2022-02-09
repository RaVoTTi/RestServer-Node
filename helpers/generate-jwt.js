const jwt = require('jsonwebtoken')


const generateJWT = (uid = '') =>{
    const payload = {uid} // genera un json

    return new Promise((resolve, reject) =>{
        
        jwt.sign(payload, process.env.PRIVATEKEY, {
            expiresIn: '1h'
        }, (err, token)=>{
            if(err){
                console.log(err)
                reject('No se pudo generar el token')
            }
            resolve(token)
        })
    })
}

module.exports = {
    generateJWT
}