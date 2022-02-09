const { request, response } = require("express");

const isAdminRole = (req = request, res = response, next) => {
  const { user } = req;

  if (!user) {
    return res.status(500).json({
      msg: "Se quiere verificar el role sin validar el token",
    });
  }
  if (user.role !== "ADMIN_ROLE") {
    return res.status(402).json({
      msg: "Usted no tiene el privilegio de borrar a nadie ",
    });
  }

  next();
};

const isRole = (...roles) => {
  return (req = request, res = response, next) => {
    const { user } = req;

    if (!user) {
      return res.status(500).json({
        msg: "Se quiere verificar el role sin validar el token",
      });
    }
    if(!roles.includes(user.role) ){
      return res.status(402).json({
        msg: "Usted no tiene el privilegio de borrar a nadie --",
      });
    }

    next();
  };
};

module.exports = {
  isAdminRole,
  isRole,
};
