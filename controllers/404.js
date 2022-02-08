const { response, request } = require("express");
// const User = require('../models/user')



const get404 = (req = request, res = response) => {
  
    res.json({
        msg: '404 not found'
    })
  };



  module.exports = {
      get404
  }