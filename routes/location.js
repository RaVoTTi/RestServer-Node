const { Router } = require("express");

const {
    locationPost,
    locationGet
} = require('../controllers/location')

// /location
const router = Router();



router.get("/", locationGet)


router.post("/",
// [
//     check('email', 'El email no es valido').isEmail(),
//     check('email').custom(validationEmail),
//     check('password', 'El password es obligatorio').notEmpty(),
//     validationCamp
// ],
locationPost)

module.exports = router