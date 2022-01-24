const {Router} = require('express')
const { dashGet } = require('../controllers/dashboard')
const router = Router()


router.get('/', dashGet)


module.exports = router