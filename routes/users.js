const { Router } = require("express");
const { check } = require("express-validator");
const {
  validationCamp,
  validateJwt,
  isAdminRole,
  isRole,
} = require("../middlewares");
// /api/users
const router = Router();

const {
  userDelete,
  userGet,
  userPost,
  userPut,
} = require("../controllers/users");

const {
  validationRole,
  validationEmail,
  validationUserId,
} = require("../helpers/db-validators");

router.get("/", userGet);

router.post(
  "/",
  [
    check("email", "El email no es valido").isEmail(),
    check("email").custom(validationEmail),
    check("name", "El name es obligatorio").notEmpty(),
    check("password", "El password es obligatorio").notEmpty(),
    check("role").custom(validationRole),

    //! check('rol').custom((rol)=> validationRole(rol))
    //? check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),

    validationCamp,
  ],
  userPost
);

router.put(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(validationUserId),
    check("role").custom(validationRole),
    validationCamp,
  ],
  userPut
);

router.delete(
  "/:id",
  [
    validateJwt,
    isRole("ADMIN_ROLE", "VENTAS_ROLE"),
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(validationUserId),
    validationCamp,
  ],
  userDelete
);

module.exports = router;
