const { response, request } = require("express");
const { generateJWT } = require("../helpers/generate-jwt");
const {User} = require("../models");

const loginGet = (req = request, res = response) => {
  res.json({
    msg: 'Login Api'
  })
};

const loginPost = async (req = request, res = response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      msg: `El email ${email} no esta registrado`
    })
  }
  if(user.state !== true){
    return res.json({
      msg: 'El usuario esta inactivo'
    })
  }

  const access = user.comparePassword(password);
  if (!access) {
    return res.json({
      msg: 'El password es incorrecto'
    })
  }

  const token = await generateJWT(user.id)
  res.json({
    msg: 'Correcto inicio de sesion',
    user,
    token
    
  })
};

module.exports = {
  loginPost,
  loginGet,
};
