const { Router } = require("express");
const { check } = require("express-validator");

const { validationCamp } = require("../middlewares/validation-camp");
const { locationPost, locationPut, locationGet } = require("../controllers/location");
const { validationTitle, validationCategory, validationId} = require("../helpers/db-validators");

// /location
const router = Router();

router.get("/", locationGet);

router.post(
  "/",
  [
    check("title", "El title es obligatorio").notEmpty(),
    check("title").custom(validationTitle),
    check("description", "El description debe ser como minimo de 5 caracteres").isLength({min: 5}),
    check("division", "El division es obligatorio").notEmpty(),
    check("division").custom(validationCategory),
    check("number", "El number es obligatorio ").notEmpty(),
    check("number", "El number debe ser numeros ").isNumeric(),

    validationCamp,
  ],
  locationPost
);
router.put('/:id',
[
  check('id','No es un id valido').isMongoId(),
  check('id').custom(validationId),
  check("division").custom(validationCategory),
  validationCamp
] ,
locationPut)

module.exports = router;
