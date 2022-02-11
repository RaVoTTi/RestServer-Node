const { Router } = require("express");
const { check } = require("express-validator");

const { validationCamp } = require("../middlewares/validation-camp");
const {
  locationsGet,
  locationGet,
  locationPost,
  locationPut,
  locationDelete,
} = require("../controllers/location");
const {
  validationTitle,
  validationDivision,
  validationLocationId,
} = require("../helpers/db-validators");
const { validateJwt, isRole, isAdminRole } = require("../middlewares");

// /location
const router = Router();

router.get("/", locationsGet);

router.get("/:id",
[
  check("id", "No es un id valido").isMongoId(),
  check("id").custom(validationLocationId),
  // check("division").custom(validationDivision),
  validationCamp,
]
, locationGet);

router.post(
  "/",
  [
    validateJwt,
    isRole('ADMIN_ROLE'),
    check("title", "El title es obligatorio").notEmpty(),
    check("title").custom(validationTitle),
    check(
      "description",
      "El description debe ser como minimo de 5 caracteres"
    ).isLength({ min: 5 }),
    check("division", "El division es obligatorio").notEmpty(),
    check("division").custom(validationDivision),
    check("number", "El number es obligatorio ").notEmpty(),
    check("number", "El number debe ser numeros ").isNumeric(),

    validationCamp,
  ],
  locationPost
);
router.put(
  "/:id",
  [
    validateJwt,
    isRole('ADMIN_ROLE'),
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(validationLocationId),
    // check("division").custom(validationDivision),
    validationCamp,
  ],
  locationPut
);

router.delete(
  "/:id",
  [
    validateJwt,
    isAdminRole,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(validationLocationId),
    validationCamp,
  ],
  locationDelete
);

module.exports = router;
