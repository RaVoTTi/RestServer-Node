const { response, request } = require("express");

const userGet = (req = request, res = response) => {
  const { q, apikey, name, page, limit } = req.query;

  res.status(200).json({
    msg: "get API - controller",
    q,
    apikey,
    name,
    page,
    limit,
  });
};

const userPost = (req = request, res = response) => {
  const { name, email } = req.body;

  res.status(201).json({
    msg: "post API - controller",
    name,
    email,
  });
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
