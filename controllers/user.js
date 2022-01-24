const { response, request } = require("express");

const userGet = (req = request, res = response) => {
  

  res.status(201).render('login');
}

const userPost = (req = request, res = response) => {
  // const { password, email } = req.body;

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
