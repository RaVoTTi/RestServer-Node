const { response, request } = require('express')
const jwt = require('jsonwebtoken') 
const User = require('../models/user')


const validateJwt = async (req = request, res = response, next)=>{
    const token = req.header('super-token')
    
    if(!token){
        return res.status(401).json(
            {msg:'No hay token'})
    }
    
    try {
        const payload = jwt.verify(token, process.env.PRIVATEKEY)

        
        user = await User.findById(payload.uid)

        if(!user.state){
            return res.status(401).json({
                  msg: 'Token no valido, state = false',
                });  
            
        }
        req.user = user

        next()
} catch (error) {
    
    console.log(error)
    res.status(401).json({msg:'Token no valido'})
    
}
}


module.exports = {validateJwt}