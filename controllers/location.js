const { response, request } = require("express");
// const User = require('../models/user')



const locationGet = (req = request, res = response) => {
  
    res.render('location');
  };

const locationPost = async (req = request, res = response) => {
    const { email, password } = req.body;
    console.log(email, password)
    

    res.redirect('/')
  };


  module.exports = {
      locationPost,
      locationGet
  }