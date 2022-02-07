const { response, request } = require("express");
const User = require("../models/user");

const userGet = async (req = request, res = response) => {
  const {limit = 5, since = 0} = req.query;
  const query = {estado: true}
  // const users = await User.find(query).skip(Number(since)).limit(Number(limit))
  // const count = await User.countDocuments(query)
  const [count, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(since)).limit(Number(limit))

  ])

  res.status(200).json({count, users})
};

const userPost = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;

  const user = new User({ name, email, password, role });
  await user.save();

  res.status(201).json({
    msg: "post API - controller",
    user,
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
