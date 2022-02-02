const Role = require("../models/role");
const User= require("../models/user");


const validationRole = async (role = "") => {
  const exist = await Role.findOne({ role });
  if (!exist) {
    throw new Error(`El rol ${role} no es valido`);
  }
};

const validationEmail = async (email = "") => {
    const exist = await User.findOne({email})
    if (exist){
      throw new Error(`El email ${email} esta registrado`);
    }
};

module.exports = {
  validationRole,
  validationEmail
};
