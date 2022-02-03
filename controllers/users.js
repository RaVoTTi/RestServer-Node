const { response, request } = require("express");
const User = require("../models/user");

const userGet = (req = request, res = response) => {
  const { q, apikey, name, page, limit } = req.query;

  res.status(200).json({
    msg: "get API - controller",
    q,
    apikey,
    name,
    page,
    limit,
  }).render('login');
};

const userPost = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });
  await user.save();

  res.status(201).json({
    msg: "post API - controller",
    user,
  }).render('location');
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
