const { response, request } = require("express");
// const User = require('../models/user')



const get404 = (req = request, res = response) => {
  
    res.render('404');
  };



  module.exports = {
      get404
  }