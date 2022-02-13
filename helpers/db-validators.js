const { Role, User, Location, Division } = require("../models");

const validationRole = async (role = "") => {
  const exist = await Role.findOne({ role });
  if (!exist) {
    throw new Error(`El rol ${role} no es valido`);
  }
};

const validationEmail = async (email = "") => {
  const exist = await User.findOne({ email });
  if (exist) {
    throw new Error(`El email ${email} esta registrado`);
  }
};

const validationTitle = async (title = "") => {
  const exist = await Location.findOne({ title });
  if (exist) {
    throw new Error(`El title ${title} esta registrado`);
  }
};

const validationDivision = async (name) => {
  const exist = await Division.findOne({ name: name.toUpperCase() });

  if (exist) {
    throw new Error(`La division ${name} esta registrado`);
  }
};

const validationLocationId = async (id) => {
  const exist = await Location.findById(id);
  if (!exist) {
    throw new Error(`El id ${id} no existe`);
  }
};
const validationDivisionId = async (id) => {
  const exist = await Division.findById(id);

  if (!exist) {
    throw new Error(`El id ${id} no existe`);
  }
};
const validationUserId = async (id) => {
  const exist = await User.findById(id);
  if (!exist) {
    throw new Error(`El id ${id} no existe`);
  }
};
module.exports = {
  validationRole,
  validationEmail,
  validationTitle,
  validationDivision,
  validationLocationId,
  validationDivisionId,
  // notValidationDivisionId,

  validationUserId,
};
