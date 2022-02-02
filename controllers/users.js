const { response, request } = require("express");
const user = require("../models/user");

const User = require('../models/user')

const userGet = (req = request, res = response) => {
  

  res.status(201).render('login');
}

const userPost = async (req = request, res = response) => {
  const {name, password, email, role  } = req.body;
  
  // const existe = User.findOne({email})
  // if(existe ){
  //   res.status(404).json({
  //     msg: 'el email debe ser unico'
  //   })
  // }
  // const user = new User({name, password, email, role  })
  console.log(req.body)
  // await user.save()
  res.status(201).redirect('/dashboard')
};

const userPut = (req = request, res = response) => {
  const { id } = req.params;
  res.status(200).json({
    msg: "put API - controller",
    id,
  });
};

const userPatch = (req = request, res = response) => {
  res.status(200).json({
    msg: "patch API - controller",
  });
};

const userDelete = (req = request, res = response) => {
  res.status(200).json({
    msg: "delete API - controller",
  });
};

module.exports = {
  userDelete,
  userGet,
  userPatch,
  userPost,
  userPut,
};
