const Role = require("../models/role");
const User= require("../models/user");
const Location = require("../models/location")
const Division = require("../models/division")

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

const validationTitle= async (title = "") => {
  const exist = await Location.findOne({title})
  if (exist){
    throw new Error(`El title ${title} esta registrado`);
  }
};

const validationCategory= async (division = "") => {
  const exist = await Division.findOne({division})
  if (!exist){
    throw new Error(`El division no ${division} esta registrado`);
  }
};
const validationLocationId = async (id )=>{
  const exist = await Location.findById(id)
  if(!exist){
    throw new Error (`El id ${id} no existe`)
  }
}
const validationUserId = async (id )=>{
  const exist = await User.findById(id)
  if(!exist){
    throw new Error (`El id ${id} no existe`)
  }
}
module.exports = {
  validationRole,
  validationEmail,
  validationTitle,
  validationCategory,
  validationLocationId,
  validationUserId


};
