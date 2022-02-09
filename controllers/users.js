const { response, request } = require("express");


const User = require("../models/user");

const userGet = async (req = request, res = response) => {
  const {limit = 5, since = 0} = req.query;
  const query = {state: true}
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

  

  const user = new User({ name, email, password: User.encryptPassword(password), role });
  
  await user.save();

  res.status(201).json({
    msg: "post API - controller",
    user,
  });
};

const userPut = async(req = request, res = response) => {
  const { id } = req.params;

  const {email, google, password , _id, ...resto} = req.body
  
  if(password){
    resto.password = User.encryptPassword(password)

  }

  const user = await User.findByIdAndUpdate(id, resto, {new: true})

  


  res.status(200).json({
    msg: "put API - controller",
    user
  });
};

const userDelete = async(req = request, res = response) => {
  

  const {id} = req.params
  const userAuth = req.user
  

  const user= await User.findByIdAndUpdate(id, {state: false}, {new: true})
  

  res.status(200).json({
    user,
    msg: "↓ Fue eliminado por ↓",
    userAuth
  });
};



module.exports = {
  userDelete,
  userGet,

  userPost,
  userPut,
};
