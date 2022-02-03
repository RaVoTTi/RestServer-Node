const { Router } = require("express");
const { check } = require("express-validator");
const { loginPost , loginGet} = require("../controllers/login");
const { validationCamp } = require("../middlewares/validation-camp");
const {  validationEmail } = require("../helpers/db-validators");

const router = Router();

router.get("/", loginGet)


router.post("/", [
    check('email', 'El email no es valido').isEmail(),
    check('email').custom(validationEmail),
    check('password', 'El password es obligatorio').notEmpty(),
    validationCamp
], loginPost)

module.exports = router