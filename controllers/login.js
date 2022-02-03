const { response, request } = require("express");
const User = require("../models/user");

const loginGet = (req = request, res = response) => {
  res.render("login");
};

const loginPost = async (req = request, res = response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error(`El email ${email} no esta registrado`);
  }
  const access = user.comparePassword(password);
  if (!access) {
    res.redirect("/login");
  }
  res.redirect("/location");
};

module.exports = {
  loginPost,
  loginGet,
};
