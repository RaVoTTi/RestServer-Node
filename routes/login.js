const { Router } = require("express");
const { check } = require("express-validator");
const { loginPost , loginGet} = require("../controllers/login");
const { validationCamp } = require("../middlewares/");
const {  validationEmail } = require("../helpers/db-validators");




// /auth
const router = Router();

router.get("/login", loginGet)


router.post("/login",
[

    check('email', 'El email no es valido').isEmail(),
    check('email').not().custom(validationEmail),
    check('password', 'El password es obligatorio').notEmpty(),
    validationCamp
],
loginPost)

module.exports = router