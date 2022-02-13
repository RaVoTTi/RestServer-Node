const { Router } = require("express");
const { check } = require("express-validator");

const { validationCamp } = require("../middlewares/validation-camp");
const {
  divisionsGet,
  divisionGet,
  divisionPost,
  divisionPut,
  divisionDelete,
} = require("../controllers/division");
const {
  validationTitle,
  validationDivision,
  validationLocationId,
  validationDivisionId,
} = require("../helpers/db-validators");
const { validateJwt, isRole, isAdminRole } = require("../middlewares");

// /location
const router = Router();

router.get("/", divisionsGet);

router.get("/:id",
[
  check("id", "No es un id valido").isMongoId(),
  check("id").custom(validationDivisionId),
  // check("division").custom(validationDivision),
  validationCamp,
]
, divisionGet);

router.post(
  "/",
  [
    validateJwt,
    isRole('ADMIN_ROLE'),
    validationCamp, 
    check("name", "El title es obligatorio").notEmpty(),
    check("name").custom(validationDivision),

    
    validationCamp,
  ],
  divisionPost
);
router.put(
  "/:id",
  [
    validateJwt,
    isRole('ADMIN_ROLE'),
    validationCamp,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(validationDivisionId),
    check("name").custom(validationDivision),
    validationCamp,
  ],
  divisionPut
);

router.delete(
  "/:id",
  [
    validateJwt,
    isAdminRole,
    validationCamp,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(validationDivisionId),
    validationCamp,
  ],
  divisionDelete
);

module.exports = router;
