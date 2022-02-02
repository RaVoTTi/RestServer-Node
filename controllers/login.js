const { response, request } = require("express");
const User = require('../models/user')



const loginGet = (req = request, res = response) => {
  
    res.render('login');
  };

const loginPost = async (req = request, res = response) => {
    const { email, password } = req.body;
    console.log(email, password)
    

    res.status(200).json({
      email,
      password
    });
  };


  module.exports = {
      loginPost,
      loginGet
  }