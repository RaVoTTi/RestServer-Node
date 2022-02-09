const { validationCamp } = require("../middlewares/validation-camp");
const { validateJwt } = require("../middlewares/validation-jwt");
const { isAdminRole, isRole } = require("../middlewares/validate-role");


module.exports= {
    validationCamp,
    validateJwt,
    isAdminRole,
    isRole,
  } 