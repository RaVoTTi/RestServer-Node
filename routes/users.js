const { Router } = require("express");
const { check } = require("express-validator");
const { validationCamp } = require("../middlewares/validation-camp");


const router = Router();

const {
  userDelete,
  userGet,
  userPatch,
  userPost,
  userPut,
} = require("../controllers/users");
const { validationRole, validationEmail } = require("../helpers/db-validators");


router.get("/", userGet);

router.post("/",[
  check('email', 'El email no es valido').isEmail(),
  check('email').custom(validationEmail),
  check('name', 'El name es obligatorio').notEmpty(),
  check('password', 'El password es obligatorio').notEmpty(),
  check('role').custom(validationRole),
  
  //! check('rol').custom((rol)=> validationRole(rol))
  //? check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
  

  validationCamp
] ,userPost);

router.put("/:id", userPut);

router.patch("/", userPatch);

router.delete("/", userDelete);




module.exports = router;
