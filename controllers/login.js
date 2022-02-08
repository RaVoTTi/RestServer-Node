const { response, request } = require("express");
const User = require("../models/user");

const loginGet = (req = request, res = response) => {
  res.json({
    msg: 'Login Api'
  })
};

const loginPost = async (req = request, res = response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error(`El email ${email} no esta registrado`);
  }
  const access = user.comparePassword(password);
  if (!access) {
    res.json({
      msg: 'La contrasea es incorrecta'
    })
  }
  res.json({
    msg: 'Correcto inicio de sesion'
  })
};

module.exports = {
  loginPost,
  loginGet,
};
