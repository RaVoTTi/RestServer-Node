const {Router} = require('express')
const { dashGet, dashPost } = require('../controllers/dashboard')
const router = Router()


router.get('/', dashGet)
router.post('/', dashPost)

module.exports = router